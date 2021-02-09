import { User } from 'firebase';
import { Body, Icon, Left, List, ListItem, Right, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/Theme';
import { useToast } from '../utility/toast/useToast';

type Props = {
  user: User | null;
};

type AccountMenuOption = {
  id: string;
  title: string;
  iconName: string;
};

export const AccountOptions = (props: Props): JSX.Element => {
  const { user } = props;
  const { showToast } = useToast();

  const onMenuPress = (id: string): void => {
    console.log('id', id);
  };

  return (
    <View>
      <List>
        {accountMenuOptions.map((menu) => (
          <ListItem
            key={menu.id}
            style={styles.listItem}
            icon={true}
            onPress={() => onMenuPress(menu.id)}
          >
            <Left>
              <Icon
                type='MaterialCommunityIcons'
                name={menu.iconName}
                style={{ color: Theme.color.grey, width: 35 }}
              />
            </Left>
            <Body>
              <Text>{menu.title}</Text>
            </Body>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </ListItem>
        ))}
      </List>
    </View>
  );
};

const accountMenuOptions: AccountMenuOption[] = [
  {
    id: 'name',
    title: 'Change name',
    iconName: 'account-circle',
  },
  {
    id: 'email',
    title: 'Change email',
    iconName: 'at',
  },
  {
    id: 'password',
    title: 'Change password',
    iconName: 'lock-reset',
  },
];

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: Theme.color.brandLight,
  },
});
