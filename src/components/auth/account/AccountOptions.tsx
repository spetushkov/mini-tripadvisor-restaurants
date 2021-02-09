import { User } from 'firebase';
import { Body, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../../../theme/Theme';
import { useToast } from '../../utility/toast/useToast';

type Props = {
  user: User | null;
};

type AccountMenuOption = {
  id: string;
  title: string;
  iconType?: 'MaterialCommunityIcons';
  iconName: string;
  iconColor: string;
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
                type={menu.iconType}
                name={menu.iconName}
                style={{ color: menu.iconColor, width: 35 }}
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
    iconType: 'MaterialCommunityIcons',
    iconName: 'account-circle',
    iconColor: Theme.color.greyLight,
  },
  {
    id: 'email',
    title: 'Change email',
    iconType: 'MaterialCommunityIcons',
    iconName: 'at',
    iconColor: Theme.color.greyLight,
  },
  {
    id: 'password',
    title: 'Change password',
    iconType: 'MaterialCommunityIcons',
    iconName: 'lock-reset',
    iconColor: Theme.color.greyLight,
  },
];

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: Theme.color.white,
  },
});
