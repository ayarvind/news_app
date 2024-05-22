import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import logo from '../data/image/logo.png';
import { useSelector } from 'react-redux';
import color from '../utility/color';
const Splash = () => {
  const colorScheme = useColorScheme();
const isDarkMode = colorScheme === 'dark';


  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? color.backgroundDark : color.backgroundLight
        
    }}>
       <Image
        source={logo}
        style={{width: 100, height: 100}}
        />
        <Text style={{color: color.iconColor, fontSize: 20, fontWeight: 'bold'}}>Real</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})