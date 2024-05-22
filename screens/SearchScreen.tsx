import React, { useState } from 'react';
import { ActivityIndicator, TextInput, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../utility/color';
import useFetch from '../utility/useFetch';
import RelatedNews from '../components/menus/RelatedNews';

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text: string) => {
        setSearch(text);
        setLoading(true);
        try {
            const { data, error } = await useFetch({
                endpoint: 'search',
                keyword: text, 
            });
            if (error) {
                setError(error);
            }
            if (data) {
                setData(data.items);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Real!</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search"
                    style={styles.input}
                />
                <Icon name="search" size={20} color={color.iconColor} />
            </View>

            {loading && <ActivityIndicator size="large" color={color.primary} />}
            {error && <Text style={styles.error}>{error.message}</Text>}
            {data.length > 0 && <RelatedNews news={data} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundLight,
        paddingHorizontal: 20,
    },
    heading: {
        color: color.primary,
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        backgroundColor: color.greyLight,
        borderRadius: 5,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        width: '90%',
        fontSize: 18,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default SearchScreen;
