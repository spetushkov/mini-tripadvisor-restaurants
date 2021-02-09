import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { User } from '../../firebase/FirebaseApi';
import { useToast } from '../utility/toast/useToast';

type Props = {
  user: User | null;
};

export const AccountInfo = (props: Props): JSX.Element | null => {
  const { user } = props;
  const { showToast } = useToast();

  if (!user) {
    return null;
  }

  const { uid, photoURL, displayName, email } = user;
  let name = displayName;
  if (!displayName && email) {
    name = email.slice(0, email.indexOf('@'));
  }

  const onAvatarChange = async (): Promise<void> => {
    try {
      const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const cameraRollStatus = permission.permissions.cameraRoll.status;
      if (cameraRollStatus !== 'granted') {
        showToast('You need to accept gallery permissions');
        return;
      }

      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (image.cancelled) {
        return;
      }

      const imageId = `avatar/${uid}`;
      await uploadImage(image.uri, imageId);
    } catch (error) {
      showToast(error);
      return Promise.reject(error);
    }
  };

  const uploadImage = async (
    uri: string,
    imageId: string,
  ): Promise<firebase.storage.UploadTask> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const ref = firebase.storage().ref().child(imageId);
      return ref.put(blob);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded={true}
        size='large'
        containerStyle={styles.avatar}
        icon={{ name: 'user', type: 'font-awesome' }}
        source={{ uri: photoURL ?? undefined }}
      >
        <Avatar.Accessory size={22} onPress={onAvatarChange} />
      </Avatar>
      <View>
        <Text style={styles.userName}>{name ?? ''}</Text>
        <Text>{email ?? ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    marginRight: 20,
  },
  userName: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
