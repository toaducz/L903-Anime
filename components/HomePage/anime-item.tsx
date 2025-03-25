// screens/AnimeItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Seasonal } from '@/API/getSeasonalAnime';

const AnimeItem = ({ season }: { season: Seasonal }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: season.images.jpg.large_image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, styles.textContainer]} numberOfLines={2}>
          {season.title}
        </Text>
        <View style={styles.footer}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    margin: 4, 
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5, 
    alignItems: "center"
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    justifyContent:'flex-start'
  },
  content: {
    marginTop: 8, // Giảm margin để gọn hơn
  },
  title: {
    fontSize: 14, // Giảm fontSize để vừa với lưới
    fontWeight: 'bold',
    lineHeight: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AnimeItem;