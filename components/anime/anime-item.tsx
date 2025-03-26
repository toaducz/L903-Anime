import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Seasonal } from '@/API/getSeasonalAnime';

const AnimeItem = ({ season, onPress }: { season: Seasonal, onPress: any }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: season.images?.jpg?.large_image_url || 'https://via.placeholder.com/150' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {season.title}
        </Text>
        <View style={styles.footer}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%', // Đặt full width để kiểm soát trong FlatList
    // maxWidth: 'fit', // Giới hạn chiều rộng tối đa
    height: "auto", // Chiều cao cố định cho toàn bộ item
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250, // Chiều cao cố định cho hình ảnh
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1, // Chiếm phần còn lại nhưng bị giới hạn bởi container
    marginTop: 8,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
});

export default AnimeItem;