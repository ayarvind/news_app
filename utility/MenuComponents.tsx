import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import News from '../components/menus/News';

const MenuComponents = (props: { navigation: any, menu: string }) => {
    const { menu } = props;
    
    const menuScreen: { [key: string]: JSX.Element } = {
        'Latest': <News category={'latest'}/>,
        'Business': <News category={'business'}/>,
        'Technology': <News category={'technology'}/>,
        'Entertainment': <News category={'entertainment'}/>,
        'Sports': <News category={'sports'}/>,
        'Science': <News category={'science'}/>,
        'Health': <News category={'health'}/>,
        'World': <News category={'world'}/>,
        'Related': <News category={'world'}/>,
        
        // Add other menu components here as needed
    };
    

    return (
        <View style={styles.container}>
            {
                menuScreen[menu]
                ? menuScreen[menu]
                : <Text style={styles.comingSoonText}>Coming Soon</Text>
            }
        </View>
    );
};

export default MenuComponents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    comingSoonText: {
        fontSize: 18,
        color: 'gray',
    },
});
