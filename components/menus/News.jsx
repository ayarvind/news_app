import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLatestNews } from '../../redux/actions/latestNewsAction';
import useFetch, { ResponseProps } from '../../utility/useFetch';
import color from '../../utility/color';
import parseDate from '../../utility/parseDate';
import Icon from 'react-native-vector-icons/Feather';
import RelatedNews from './RelatedNews';
import { useNavigation } from '@react-navigation/native';
const Latest = ({ category }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [openSubnewsId, setOpenSubnewsId] = useState();
    const [selectedNewsId, setSelectedNewsId] = useState(null); // Track selected news ID for opening bottom drawer
    const [latestNews, setLatestNews] = useState([]);
    const navigation = useNavigation();
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await useFetch({ endpoint: category });
            if (response.error) {
                if (response.error.status === 429) {
                    setTimeout(() => fetchData(), 2000);
                } else {
                    setError(response.error);
                }
            } else {
                setLatestNews(response.data.items);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchData();
    }, [fetchData, category]);

    const openDrawerForNews = (newsId) => {
        setSelectedNewsId(newsId); 
        setOpenSubnewsId(newsId); 
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', marginTop: -20 }]}>
                <ActivityIndicator size="large" color={color.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {latestNews.length > 0 && (
                <>
                    <Text style={styles.header}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                    <FlatList
                        pagingEnabled
                        data={latestNews}
                        keyExtractor={(item, index) => `${index}`} 
                        renderItem={({ item, index }) => (
                            <View key={index}>
                               <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate('ReadNews', { news: item.newsUrl });
                                }}
                               >

                               <View style={styles.newsItem}>
                                    {item.images && (
                                        <Image
                                            source={{ uri: item.images.thumbnailProxied }}
                                            style={{ width: '100%', height: 200, backgroundColor: '#f9f9f9' }}
                                        />
                                    )}
                                    <View style={{ padding: 10 }}>
                                        <Text style={styles.newsTitle}>{item.title}</Text>
                                        <View style={styles.metadataContainer}>
                                            <Text style={styles.publisher}>{item.publisher}</Text>
                                            <Text>{parseDate(item.timestamp)}</Text>
                                        </View>
                                    </View>
                                </View>
                               </TouchableOpacity>
                                {item.hasSubnews && (
                                    <TouchableOpacity
                                        style={styles.showHideButton}
                                        onPress={() => {
                                            console.log('item', index); // Log the index
                                            setOpenSubnewsId(index); // Use index as ID
                                        }}
                                    >
                                        <Text style={styles.showHideText}>
                                            {openSubnewsId === index ? 'Hide' : 'Show'} Related news
                                            <Icon name={openSubnewsId === index ? 'chevron-up' : 'chevron-down'} size={20} color={color.primary} />
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                {openSubnewsId === index && (
                                   <>
                                     {/* {index} */}
                                     <RelatedNews
                                        news={item.subnews || []}
                                    />
                                   </>
                                )}
                            </View>
                        )}
                    />
                    <View style={{ height: 120 }} />
                </>
            )}
        </View>
    );
};

export default Latest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        width: '100%',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    newsItem: {
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    newsTitle: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    metadataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        gap: 10,
        marginTop: 5,
    },
    publisher: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
        borderRightWidth: 2,
        borderRightColor: 'gray',
        paddingRight: 10,
    },
    showHideButton: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 15,
    },
    showHideText: {
        color: color.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
