import { Image, StyleSheet, Platform, Text, View, ActivityIndicator, FlatList } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { useSeasonalAnimeNow, useSeasonalAnime } from '@/API/getSeasonalAnime'
import { useEffect, useState, useCallback } from 'react'
import AnimeItem from '@/components/anime/anime-item'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()
  const { data: season, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useSeasonalAnimeNow({})

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' />
      </ThemedView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC' }}
        headerImage={
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 'auto', height: '200%', justifyContent: 'center' }}
          />
        }
      >
        <ThemedView>
          <Text style={[styles.horizontal, styles.title]}>Anime mới mùa này!</Text>
        </ThemedView>

        <FlatList
          endFillColor={'default'}
          data={season?.pages.flatMap(page => page?.data)}
          numColumns={2}
          renderItem={({ item }) => (
            <AnimeItem
              season={item!}
              onPress={() => router.push({ pathname: '/anime-detail', params: { mal_id: item?.mal_id } })}
            />
          )}
          keyExtractor={item => item!.mal_id}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          }}
          onEndReachedThreshold={0.9}
          style={styles.flatList}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size='large' style={[styles.container, styles.horizontal]} /> : null
          }
          initialNumToRender={10}
        />
      </ParallaxScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10
  },
  title: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center'
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
  flatList: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    textShadowRadius: 1
  }
})
