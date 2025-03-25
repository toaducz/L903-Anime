import { Image, StyleSheet, Platform, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Box, Grid, Spinner, Center } from 'zmp-ui'
import { useQuery } from '@tanstack/react-query';
import { getSeasonalAnime } from '@/API/getSeasonalAnime'
import { useEffect, useState, useCallback } from 'react';
import AnimeItem from '@/components/HomePage/anime-item';
import { Seasonal } from '@/API/getSeasonalAnime';

export default function HomeScreen() {

  const { data: season, isLoading, fetchNextPage, isFetchingNextPage } = getSeasonalAnime({ year: "2025", season: "winter", page: 1 })

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  let allAnime = season?.pages.flatMap((page) => page?.data) || [];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/pekora-sad.jpg')}
          style={{ width: "auto", height: "200%", justifyContent: 'center' }}
        />
      }>
      <ThemedView >
        <Center intrinsic><Text style={[styles.horizontal]}>Anime mới mùa này!</Text></Center>
      </ThemedView>

      <FlatList
        data={allAnime}
        numColumns={2}
        renderItem={({ item }) => <AnimeItem season={item} />}
        keyExtractor={(item) => item.mal_id.toString()}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.8}
        style={styles.flatList}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" style={[styles.container, styles.horizontal]} />
          ) : null
        }
        initialNumToRender={10}
      />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    color: 'white',
    fontSize: 25
  },
  flatList: {
    flex: 1,
  },
});


