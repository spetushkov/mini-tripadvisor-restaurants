import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text } from 'native-base';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { AccountScreen } from '../../screens/account/AccountScreen';
import { FavoritesScreen } from '../../screens/FavoritesScreen';
import { RestaurantsScreen } from '../../screens/RestaurantsScreen';
import { Theme } from '../../theme/Theme';

type Props = DrawerContentComponentProps;

const DrawerContent = (props: Props): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.drawerHeader}>
        <View>
          <Text style={styles.drawerHeaderText}>Drawer Menu</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}></DrawerItemList>
        <DrawerItem
          icon={() => (
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
              size={22}
              color='black'
            />
          )}
          label='Close'
          onPress={() => props.navigation.closeDrawer()}
        />
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  drawerHeaderText: {
    color: Theme.color.brandLight,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const Drawer = createDrawerNavigator();

const DrawerNavigator = (): JSX.Element => {
  return (
    <Drawer.Navigator
      backBehavior='history'
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name='Restaurants' component={RestaurantsScreen} />
      <Drawer.Screen name='Favorites' component={FavoritesScreen} />
      <Drawer.Screen name='Account' component={AccountScreen} />
    </Drawer.Navigator>
  );
};

export const DrawerNavigation = (): JSX.Element => {
  return <DrawerNavigator />;
};
