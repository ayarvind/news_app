import React, { act } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import color from '../utility/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AppBar = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? color.backgroundDark : color.backgroundLight;
    const [activeMenu, setActiveMenu] = React.useState('Latest');
    const dispatch = useDispatch();
    const navigations_ = useNavigation();
    const menu = useSelector((state: {
        menu: string
    }) => state.menu);

    return (
        <>
            <View style={[styles.container, { backgroundColor:
            colorScheme === 'dark' ? color.backgroundDark : color.backgroundLight,
             }]}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    
                }}>
              

                {/* Right drwaer */}
                
                <Text style={{
                    color: color.primary,
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginVertical: 15,
                }}> 
                Welcome!
                </Text>
                </View>


                <View style={[styles.inputContainer,{
                    backgroundColor: colorScheme === 'dark' ? color.backgroundDarkPriamry : color.greyLight,
                
                }]}>
                    <TouchableOpacity
                        onPress={() => {
                            navigations_.navigate('Search');
                        }}
                        style={styles.inputContainer}
                    >
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor={color.iconColor}
                        />
                        <Icon name="search" size={20} color={color.iconColor} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Horizontal scrollable menus */}
            <View style={{
                backgroundColor: backgroundColor,
                height: 50,
                alignItems: 'center',

            }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    keyExtractor={(item) => item}
                    data={
                        ['Latest', 'Entertainment', 'World', 'Business', 'Health', 'Sport', 'Science', 'Technology']

                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {

                                setActiveMenu(item);
                                dispatch({
                                    type: 'SET_MENU', payload: item
                                });

                            }}
                            style={{
                                paddingHorizontal: 20,
                                marginTop: 10,
                                borderRadius: 5,
                                margin: 5,
                                // give only bottom border
                                borderBottomWidth: 3,
                                borderBottomColor: activeMenu === item ? color.primary : 'transparent',

                            }}
                        >
                            <Text style={{
                                color: activeMenu === item ? 'black' : color.iconColor,
                                fontWeight: activeMenu === item ? 'bold' : 'normal',
                                fontSize: 18,


                            }}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />


            </View>
        </>
    );
};

export default AppBar;

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: '100%',

        // flexDirection: 'row',
        paddingHorizontal: 20,
        // alignItems: 'center',

    },
    menuButton: {
        marginRight: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        // backgroundColor: color.greyLight,
        borderRadius: 5,
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: color.iconColor,
        marginLeft: 10,
    },
});
