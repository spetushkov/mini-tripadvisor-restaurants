import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Account } from '../../screens/auth/Account';
import { Favorites } from '../../screens/Favorites';
import { Restaurants } from '../../screens/Restaurants';

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
    backgroundColor: '#03cafc',
    height: 150,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeaderText: {
    color: 'white',
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
      <Drawer.Screen name='Restaurants' component={Restaurants} />
      <Drawer.Screen name='Favorites' component={Favorites} />
      <Drawer.Screen name='Account' component={Account} />
    </Drawer.Navigator>
  );
};

export const DrawerNavigation = (): JSX.Element => {
  return <DrawerNavigator />;
};
