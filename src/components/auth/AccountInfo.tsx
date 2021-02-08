import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { User } from '../../firebase/FirebaseApi';

type Props = {
  user: User | null;
};

export const AccountInfo = (props: Props): JSX.Element | null => {
  const { user } = props;

  if (!user) {
    return null;
  }

  const { photoURL, displayName, email } = user;

  return (
    <View style={styles.container}>
      <Avatar
        rounded={true}
        size='large'
        containerStyle={styles.avatar}
        icon={{ name: 'user', type: 'font-awesome' }}
        source={{ uri: photoURL ?? undefined }}
      >
        <Avatar.Accessory size={22} />
      </Avatar>
      <View>
        <Text style={styles.userName}>{displayName ?? ''}</Text>
        <Text style={styles.userEmail}>{email ?? ''}</Text>
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
  userEmail: {},
});
