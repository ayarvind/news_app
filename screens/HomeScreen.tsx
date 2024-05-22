import { SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';
import { useNavigation } from '@react-navigation/native';
import color from '../utility/color';
import { useSelector } from 'react-redux';
import MenuComponents from '../utility/MenuComponents';

const HomeScreen = ({ navigation }: {
    navigation: any

}) => {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? color.backgroundDark : color.backgroundLight;

    const menu = useSelector((state: any) => state.menu).menu || 'Latest';

    return (

        <ScrollView style={[styles.container, { backgroundColor }]}>
            <SafeAreaView>
                <AppBar navigation={navigation} />
                <MenuComponents
                    navigation={navigation}
                    menu={menu}
                />
            </SafeAreaView>

        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
