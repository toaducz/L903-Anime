import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getSeasonalAnimeNow, getTopAnimeNow } from '@/API/getSeasonalAnime';
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
  const { data: season, isLoading: seasonLoading } = useQuery(getSeasonalAnimeNow({ limit: 10 }));
  const { data: top, isLoading: topLoading } = useQuery(getTopAnimeNow({ limit: 10 }));

  const tabs = [
    { name: 'Top 10 Anime mùa', data: season?.data, isLoading: seasonLoading },
    { name: 'Top 10 Anime', data: top?.data, isLoading: topLoading },
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
        data={tabs[activeTab].data}
        numColumns={2}
        renderItem={({ item }) => (
          <AnimeItem
            season={item}
            onPress={() => router.push({ pathname: '/anime-detail', params: { mal_id: item.mal_id } })}
          />
        )}
        keyExtractor={(item) => item.mal_id}
        style={styles.flatList}
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
});