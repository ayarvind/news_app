import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LocalNews from './screens/LocalNews';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/Ionicons';
import colors from './utility/color';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen';
import ReadNews from './screens/ReadNews';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
       
      />
      <Stack.Screen
        name="ReadNews"
        component={ReadNews}
       
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? colors.backgroundDark : colors.backgroundLight;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Tab.Navigator
        initialRouteName='HomeTab'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor,
            borderTopWidth: 1,
            borderTopColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 70,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => <Icon name="home" size={25} color={color} />,
          }}
        />
        <Tab.Screen
          name="Local"
          component={LocalNews}
          options={{
            tabBarIcon: ({ color }) => <IconFont name="location-outline" size={25} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="user" size={25} color={color} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Main;
