import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "./screens/Welcome";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import FavoritesScreen from "./screens/Favorites";
import SettingsScreen from "./screens/Settings";

import { HamburgerIcon, SettingsIcon, BackIcon } from "./components/icons";

import { CustomDrawerContent } from "./components";
import { colors } from "./utils/constants";

const AppMainTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: "Inicio",
        drawerIcon: ({ tintColor }) =>
          <FontAwesome name="home" size={23} color={tintColor} />,
        tabBarLabel: "Inicio",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="home" size={23} color={tintColor} />,
        headerStyle: {
          backgroundColor: colors.GRAY_900
        },
        headerTitle: "Inicio",
        headerTitleStyle: {
          color: colors.WHITE
        },
        headerLeft: (
          <HamburgerIcon onPress={() => navigation.navigate("DrawerOpen")} />
        )
      })
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: "Favorites",
        drawerIcon: ({ tintColor }) =>
          <FontAwesome name="heartbeat" size={23} color={tintColor} />,
        tabBarLabel: "Favorites",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="heartbeat" size={23} color={tintColor} />,
        headerStyle: {
          backgroundColor: colors.BLUEGRAY_300
        },
        headerTitle: "Favorites",
        headerTitleStyle: {
          color: colors.WHITE
        },
        headerLeft: (
          <HamburgerIcon onPress={() => navigation.navigate("DrawerOpen")} />
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: "Profile",
        drawerIcon: ({ tintColor }) =>
          <FontAwesome name="user-circle" size={23} color={tintColor} />,
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="user-circle" size={23} color={tintColor} />,
        headerStyle: {
          backgroundColor: colors.BLUEGRAY_300
        },
        headerTitle: "Profile",
        headerTitleStyle: {
          color: colors.WHITE
        },
        headerLeft: (
          <HamburgerIcon onPress={() => navigation.navigate("DrawerOpen")} />
        ),
        headerRight: (
          <SettingsIcon onPress={() => navigation.navigate("Settings")} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.WHITE,
      inactiveTintColor: colors.BLUEGRAY_50,
      inactiveBackgroundColor: colors.BLUEGRAY_900,
      activeBackgroundColor: colors.BLUEGRAY_800,
      showIcon: true,
      showLabel: Platform.OS === "ios",
      indicatorStyle: {
        backgroundColor: colors.BLUEGRAY_300
      },
      style: {
        backgroundColor: colors.BLUEGRAY_900
      },
      upperCaseLabel: false
    },
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false
  }
);

const AppMainStack = createStackNavigator(
  {
    Home: { screen: AppMainTab },
    Settings: { screen: SettingsScreen }
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE
    },
    mode: "modal"
  }
);

const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: AppMainStack
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: "Settings",
        drawerIcon: ({ tintColor }) =>
          <Ionicons name="md-settings" size={23} color={tintColor} />,
        headerStyle: {
          backgroundColor: colors.PINK_100
        },
        headerTitle: "Settings",
        headerTitleStyle: {
          color: colors.WHITE
        },
        headerLeft: <BackIcon onPress={() => navigation.goBack()} />
      })
    }
  },
  {
    contentComponent: props => <CustomDrawerContent {...props} />,
    contentOptions: {
      activeBackgroundColor: colors.BLUEGRAY_100,
      activeTintColor: colors.WHITE,
      inactiveTintColor: colors.BLUEGRAY_200
    }
  }
);

const Navigator = createBottomTabNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Main: { screen: AppDrawer }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    },
    swipeEnabled: false
  }
);

export default Navigator;
