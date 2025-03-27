import React from 'react';
import { StyleSheet, FlatList, View, Text, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getSeasonalAnimeNow, getTopAnimeNow } from '@/API/getSeasonalAnime';
import AnimeItem from '@/components/anime/anime-item';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Loading from '@/components/loading/loading';
import Error from '@/components/error';

const Tab = createMaterialTopTabNavigator();

const SeasonalAnimeTab = () => {
    const router = useRouter();
    const { data: season, isLoading, isError } = useQuery(getSeasonalAnimeNow({ limit: 10 }));

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <Error/>
        )
    }

    return (
        <View style={styles.tabContainer}>
            {season?.data === undefined || isError ? (
                <Error/>
            ) : (
                <FlatList
                    endFillColor={'default'}
                    data={season?.data}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <AnimeItem
                            season={item!}
                            onPress={() =>
                                router.push({ pathname: '/anime-detail', params: { mal_id: item?.mal_id } })
                            }
                        />
                    )}
                    keyExtractor={(item) => item!.mal_id}
                    onEndReachedThreshold={0.1}
                    style={styles.flatList}
                    initialNumToRender={10}
                />
            )}
        </View>
    );
};

const TopAnimeTab = () => {
    const router = useRouter();
    const { data: top, isLoading, isError } = useQuery(getTopAnimeNow({ limit: 10 }));

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <Error/>
        )
    }

    return (
        <View style={styles.tabContainer}>
            {top?.data === undefined || isError ? (
                <Error/>
            ) : (
                <FlatList
                    endFillColor={'default'}
                    data={top?.data}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <AnimeItem
                            season={item!}
                            onPress={() =>
                                router.push({ pathname: '/anime-detail', params: { mal_id: item?.mal_id } })
                            }
                        />
                    )}
                    keyExtractor={(item) => item!.mal_id}
                    onEndReachedThreshold={0.1}
                    style={styles.flatList}
                    initialNumToRender={10}
                />
            )}
        </View>
    );
};

export default function CategoryScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: '#f5f5f5' },
                    tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
                    tabBarIndicatorStyle: { backgroundColor: '#FF6347', height: 3 },
                }}
            >
                <Tab.Screen
                    name="Seasonal"
                    component={SeasonalAnimeTab}
                    options={{ tabBarLabel: 'Top 10 Anime Mùa' }}
                />
                <Tab.Screen
                    name="Top"
                    component={TopAnimeTab}
                    options={{ tabBarLabel: 'Top 10 Anime thế giới' }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    flatList: {
        flex: 1,
        paddingBottom: 100,
    },
    title: {
        paddingTop: 20,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: '700',
    },
});