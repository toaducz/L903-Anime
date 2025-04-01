import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'

const Error = () => {
  return (
    <View style={{ paddingTop: 120 }}>
      <Image source={require('@/assets/images/kobo.gif')} style={{ width: 200, height: 200 }} />
      <Text style={[styles.horizontal, styles.title]}>Đang lỗi, vui lòng thử lại!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
  title: {
    paddingTop: 20,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default Error
