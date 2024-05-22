// RelatedNews.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import parseDate from '../../utility/parseDate';

const RelatedNews = ({ news }) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={news}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.newsItem}>
                        {item.images && (
                            <Image
                                source={{ uri: item.images.thumbnailProxied }}
                                style={styles.image}
                            />
                        )}
                        <View style={styles.textContainer}>
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <View style={styles.metadataContainer}>
                                <Text style={styles.publisher}>{item.publisher}</Text>
                                <Text style={styles.date}>{parseDate(item.timestamp)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    newsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: '#f9f9f9',
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    metadataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    publisher: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 10,
    },
    date: {
        color: 'gray',
        fontSize: 12,
    },
});

export default RelatedNews;
