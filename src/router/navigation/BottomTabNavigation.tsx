import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import React from 'react';
import { Theme } from '../../theme/Theme';
import { Route } from '../Route';
import { AccountStack } from '../stack/AccountStack';
import { FavoritesStack } from '../stack/FavoritesStack';
import { RestaurantsStack } from '../stack/RestaurantsStack';
import { SearchStack } from '../stack/SearchStack';
import { TopRestaurantsStack } from '../stack/TopRestaurantsStack';

type TabBarIconProps = { focused: boolean; color: string; size: number };

const screenOptions = (title: string, name: string) => {
  return {
    title,
    tabBarIcon: ({ color, size }: TabBarIconProps) => (
      <Icon type='MaterialCommunityIcons' name={name} style={{ fontSize: size, color }} />
    ),
  };
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => {
  return (
    <BottomTab.Navigator
      initialRouteName={Route.BottomTab.restaurants}
      tabBarOptions={{
        inactiveTintColor: Theme.color.brandInfo,
        activeTintColor: Theme.color.brandPrimary,
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <BottomTab.Screen
        name={Route.BottomTab.restaurants}
        component={RestaurantsStack}
        options={screenOptions('Restaurants', 'compass-outline')}
      />
      <BottomTab.Screen
        name={Route.BottomTab.favorites}
        component={FavoritesStack}
        options={screenOptions('Favorites', 'heart-outline')}
      />
      <BottomTab.Screen
        name={Route.BottomTab.topRestaurants}
        component={TopRestaurantsStack}
        options={screenOptions('Top 5', 'star-outline')}
      />
      <BottomTab.Screen
        name={Route.BottomTab.search}
        component={SearchStack}
        options={screenOptions('Search', 'magnify')}
      />
      <BottomTab.Screen
        name={Route.BottomTab.account}
        component={AccountStack}
        options={screenOptions('Account', 'home-outline')}
      />
    </BottomTab.Navigator>
  );
};

export const BottomTabNavigation = (): JSX.Element => {
  return <BottomTabNavigator />;
};
