import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Text, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { User } from '../../firebase/FirebaseAuthApi';
import { useFirebase } from '../../firebase/useFirebase';
import { ScreenSpinner } from '../utility/loader/ScreenSpinner';
import { useToast } from '../utility/toast/useToast';

type Props = {
  user: User | null;
};

export const AccountInfo = (props: Props): JSX.Element | null => {
  const { user } = props;
  const { showToast } = useToast();
  const { uploadImage, getImageDownloadUrl, updateCurrentUserProfile } = useFirebase();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return null;
  }

  const { uid, photoURL, displayName, email } = user;
  const name = getNameFromEmailIfNull(displayName, email);

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
      setLoading(true);
      await updateAvatar(image.uri, imageId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(error);
    }
  };

  const updateAvatar = async (uri: string, id: string): Promise<void> => {
    try {
      await uploadImage(uri, id);
      const photoURL = await getImageDownloadUrl(id);
      const payload: Partial<User> = { photoURL };
      await updateCurrentUserProfile(payload);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenSpinner visible={loading} />
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

const getNameFromEmailIfNull = (name: string | null, email: string | null): string | null => {
  let nameUpdated = name;
  if (!name && email) {
    nameUpdated = email.slice(0, email.indexOf('@'));
  }
  return nameUpdated;
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
