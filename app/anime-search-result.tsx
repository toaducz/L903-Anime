import React, { useState } from 'react'
import { StyleSheet, ActivityIndicator, FlatList, View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useLocalSearchParams } from 'expo-router'
import AnimeItem from '@/components/anime/anime-item'
// import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'
import Loading from '@/components/loading/loading'
import { useSearchAnime } from '@/API/getAnimeSearch'

export default function SearchResultScreen() {
  const router = useRouter()
  const { query } = useLocalSearchParams()

  const [orderBy, setOrderBy] = useState('score')
  const [sort, setSort] = useState('desc')

  // console.log(query)

  const {
    data: result,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useSearchAnime({
    q: String(query),
    sort: sort,
    order_by: orderBy
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#white', paddingVertical: 25 }}>
      <View style={styles.container}>
        <View style={styles.selectorContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Lọc:</Text>
            <Picker selectedValue={orderBy} onValueChange={itemValue => setOrderBy(itemValue)} style={styles.picker}>
              <Picker.Item label='Mặc định' value='mal_id' />
              <Picker.Item label='Tựa đề' value='title' />
              <Picker.Item label='Chiếu gần nhất' value='start_date' />
              <Picker.Item label='Chiếu xa nhất' value='end_date' />
              <Picker.Item label='Mặc định' value='mal_id' />
              <Picker.Item label='Tựa đề' value='title' />
              <Picker.Item label='Số tập' value='episodes' />
              <Picker.Item label='Điểm' value='score' />
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Xếp theo:</Text>
            <Picker selectedValue={sort} onValueChange={itemValue => setSort(itemValue)} style={styles.picker}>
              <Picker.Item label='Giảm dần' value='desc' />
              <Picker.Item label='Tăng dần' value='asc' />
            </Picker>
          </View>
        </View>
        {result?.pages[0]?.data.length === 0 || result?.pages[0]?.data === undefined ? (
          <View>
            <Text style={[styles.horizontal, styles.selectorContainer, styles.title]}>Không có kết quả!</Text>
          </View>
        ) : (
          <FlatList
            endFillColor={'default'}
            data={result?.pages.flatMap(page => page?.data)}
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
            onEndReachedThreshold={0.1}
            style={styles.flatList}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size='large' style={[styles.container, styles.horizontal, styles.padding]} />
              ) : null
            }
            initialNumToRender={10}
          />
        )}
      </View>
    </View>
  )
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
    padding: 10
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
    shadowRadius: 4
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  picker: {
    height: 54,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  flatList: {
    flex: 1,
    // paddingLeft: 18
    paddingBottom: 100
  },
  title: {
    paddingTop: 40,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  }
})
