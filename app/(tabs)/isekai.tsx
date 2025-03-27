import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet, ActivityIndicator, FlatList, View, TextInput, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSeasonalAnime } from '@/API/getSeasonalAnime';
import AnimeItem from '@/components/anime/anime-item';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import Loading from '@/components/loading/loading';
import { getAnimeIsekai } from '@/API/getAnimeIsekai';

export default function IsekaiScreen() {
    const router = useRouter()



    const { data: isekai, isLoading, isSuccess } = useQuery(getAnimeIsekai());

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
            <Text style={[styles.horizontal, styles.title, styles.selectorContainer]}>Isekai moi da den</Text>
            <View style={styles.container}>
                {isekai?.data.length === 0 || isekai?.data === undefined ? (<View><Text style={[styles.horizontal, styles.selectorContainer, styles.title]}>Không có kết quả!</Text></View>) : (<FlatList
                    endFillColor={'default'}
                    data={isekai?.data}
                    numColumns={2}
                    renderItem={({ item }) => <AnimeItem season={item!} onPress={() => router.push({ pathname: '/anime-detail', params: { mal_id: item?.mal_id } })} />}
                    keyExtractor={(item) => item!.mal_id}
                  
                    style={styles.flatList}
                  
                    initialNumToRender={10}
                />)

                }

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    padding: {
        paddingVertical: 100
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    searchBar: {
        height: 50,
        width: '95%',
        margin: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        backgroundColor: 'white',
        fontSize: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
    },
    pickerWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    picker: {
        height: 54,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    flatList: {
        flex: 1,
        // paddingLeft: 18
        paddingBottom: 100
    },
    title: {
        paddingTop: 20,
        fontSize: 24,
        color: "black",
        textAlign: 'center'
    },

});
