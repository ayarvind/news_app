import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const ReadNews = (props: { navigation: any }) => {
    const { navigation } = props
    const url = navigation.getParam('url')

    return (
        <View>
            <WebView
                source={{ uri: url }}
                style={{
                    marginTop: 20,
                    flex: 1
                }}
            />
        </View>
    )
}

export default ReadNews

const styles = StyleSheet.create({})