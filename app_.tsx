/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Main from './Main';
import color from './utility/color';
import Drawer from './components/Drawer';
import Splash from './components/Splash';

function App() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  useEffect(() => {
    dispatch({
      type: 'SET_THEME',
      payload: {
        theme: colorScheme
      }
    });
  }, [colorScheme, dispatch]);

  const theme = useSelector((state:{
    theme:string
  }) => state.theme);
  const isDarkMode = theme === 'dark';
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setSplash(false);
    }, 2500);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <>
      {splash ? (
        <Splash />
      ) : (
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={isDarkMode ? color.backgroundDark : color.backgroundLight}
          />
          <Main />
          {/* <Drawer /> */}
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
