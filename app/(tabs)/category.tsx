import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getSeasonalAnimeNow, getTopAnimeNow, useSeasonalUpcoming } from '@/API/getSeasonalAnime';
import AnimeItem from '@/components/anime/anime-item';
import { useRouter } from 'expo-router';
import Loading from '@/components/loading/loading';
import Error from '@/components/error';

export default function CategoryScreen() {

  const delayApiCall = async (apiFunc: () => Promise<any>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay 1 giây
    return apiFunc();
  };

  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const { data: season, isLoading: seasonLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useSeasonalUpcoming();
  const { data: top, isLoading: topLoading } = useQuery(getTopAnimeNow({ limit: 10 }));

  const tabs = [
    { name: 'TV Anime sắp chiếu', data: season?.pages, isLoading: seasonLoading },
    { name: 'Top 10 TV Anime', data: top?.data, isLoading: topLoading },
  ];


  if (tabs[activeTab].isLoading) return <Loading />;

  if (tabs[activeTab].data === undefined) return <Error />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={styles.tabText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        endFillColor={'default'}
        data={activeTab === 0
          ? season?.pages.flatMap((page) => page?.data)
          : tabs[activeTab].data}
        numColumns={2}
        renderItem={({ item }) => <AnimeItem season={item!} onPress={() => router.push({ pathname: '/anime-detail', params: { mal_id: item?.mal_id } })} />}
        keyExtractor={(item) => item!.mal_id}
        onEndReached={activeTab === 0 ? () => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        } : undefined}

        onEndReachedThreshold={activeTab === 0 ? 0.9 : undefined}
        style={styles.flatList}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" style={[styles.container, styles.horizontal]} />
          ) : null
        }
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6347',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  flatList: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: 'heavy'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    color: 'white',
    fontSize: 25
  },
});