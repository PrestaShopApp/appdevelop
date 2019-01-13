import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import WelcomeScreen from "./screens/Welcome";
import HomeScreen from "./screens/Home";
import CategoriesScreen from "./screens/Categories";
import ShoppingBagScreen from "./screens/ShoppingBag";
import ProfileScreen from "./screens/Profile";
import SettingsScreen from "./screens/Settings";

import { HamburgerIcon, SettingsIcon, BackIcon } from "./components/icons";

import { CustomDrawerContent } from "./components";
import { colors } from "./utils/constants";

const AppMainTab = createMaterialBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeScreen,
      title: "Inicio",
      navigationOptions: ({ navigation }) => ({
        drawerLabel: "Inicio",
        title: "Inicio",
        headerStyle: {
          backgroundColor: colors.WHITE
        },
        headerTitle: "Inicio",
        tabBarLabel: "Inicio",
        tabBarIcon: ({ tintColor, focused }) =>
          <FontAwesome name="home" size={23} color={tintColor} />
      })
    },
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        title: "Categorias",
        tabBarLabel: "Categorias",
        tabBarIcon: ({ tintColor, focused }) =>
          <FontAwesome name="align-center" size={23} color={tintColor} />
      }
    },
    ShoppingBag: {
      screen: ShoppingBagScreen,
      navigationOptions: {
        title: "Carrito",
        tabBarLabel: "Carrito",
        tabBarIcon: ({ tintColor, focused }) =>
          <FontAwesome name="shopping-basket" size={23} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Perfil",
        tabBarLabel: "Perfil",
        tabBarIcon: ({ tintColor, focused }) =>
          <FontAwesome name="user" size={23} color={tintColor} />
      }
    }
  },
  {
    initialRouteName: "HomeTab",
    activeColor: colors.GRAY_100,
    inactiveColor: colors.GRAY_100,
    barStyle: { backgroundColor: colors.GRAY_900 }
  }
);
const AppMainStack = createStackNavigator(
  {
    Home: {
      screen: AppMainTab,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "iShop",
        headerLeft: <HamburgerIcon onPress={() => console.log(navigation)} />
      })
    },
    Settings: { screen: SettingsScreen }
  },
  {
    cardStyle: {
      backgroundColor: colors.GRAY_100
    },
    navigationOptions: {
      animationEnabled: true,
      headerStyle: {
        backgroundColor: colors.GRAY_900,
        height: 40
      },
      headerTitleStyle: {
        color: colors.WHITE,
        right: 25,
        flex: 1,
        textAlign: "center"
      }
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
        drawerLabel: "Información de la aplicación",
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
