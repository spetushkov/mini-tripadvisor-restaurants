import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import React from 'react';
import { Theme } from '../theme/Theme';
import { Routes } from './route/Routes';
import { AccountStack } from './stack/AccountStack';
import { FavoritesStack } from './stack/FavoritesStack';
import { RestaurantsStack } from './stack/RestaurantsStack';
import { SearchStack } from './stack/SearchStack';
import { TopRestaurantsStack } from './stack/TopRestaurantsStack';

type TabBarIconProps = { focused: boolean; color: string; size: number };

const screenOptions = (title: string, name: string) => {
  return {
    title: title,
    tabBarIcon: ({ color, size }: TabBarIconProps) => (
      <Icon type='MaterialCommunityIcons' name={name} style={{ fontSize: size, color }} />
    ),
  };
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => {
  return (
    <BottomTab.Navigator
      initialRouteName={Routes.BottomTab.restaurants}
      tabBarOptions={{
        inactiveTintColor: '#646464',
        activeTintColor: Theme.color.green,
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <BottomTab.Screen
        name={Routes.BottomTab.restaurants}
        component={RestaurantsStack}
        options={screenOptions('Restaurants', 'compass-outline')}
      />
      <BottomTab.Screen
        name={Routes.BottomTab.favorites}
        component={FavoritesStack}
        options={screenOptions('Favorites', 'heart-outline')}
      />
      <BottomTab.Screen
        name={Routes.BottomTab.topRestaurants}
        component={TopRestaurantsStack}
        options={screenOptions('Top 5', 'star-outline')}
      />
      <BottomTab.Screen
        name={Routes.BottomTab.search}
        component={SearchStack}
        options={screenOptions('Search', 'magnify')}
      />
      <BottomTab.Screen
        name={Routes.BottomTab.account}
        component={AccountStack}
        options={screenOptions('Account', 'home-outline')}
      />
    </BottomTab.Navigator>
  );
};

export const BottomTabNavigation = (): JSX.Element => {
  return <BottomTabNavigator />;
};
