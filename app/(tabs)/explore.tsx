import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { getAnimeByRandom } from '@/API/getRandomAnime'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import Loading from '@/components/loading/loading'

export default function TabTwoScreen() {
  const router = useRouter()
  const { data: random, isLoading, refetch } = useQuery(getAnimeByRandom())

  if (isLoading) {
    return <Loading />
  }

  const handlePress = (id: string) => {
    router.push({ pathname: '/anime-detail', params: { mal_id: id.toString() } })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.guideText}>Không biết xem gì thì ấn vào đây</Text>
      <Text style={styles.guideText}>
        <Text style={styles.guideText}>Khả năng ra phim lỏ là</Text>
        <Text style={{ fontWeight: 700 }}> 90%</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handlePress(random?.data.mal_id || '')
          refetch()
        }}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  guideText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#003087',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
})
