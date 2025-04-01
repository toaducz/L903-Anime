import type { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import WebView from 'react-native-webview'
import { ThemedView } from '@/components/ThemedView'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'

const HEADER_HEIGHT = 230

type Props = PropsWithChildren<{
  headerYoutubeEmbedUrl: string
  headerBackgroundColor: string
}>

export default function CustomParallaxScrollView({ children, headerYoutubeEmbedUrl, headerBackgroundColor }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const bottom = useBottomTabOverflow()

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1])
        }
      ]
    }
  })

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }, headerAnimatedStyle]}>
          <WebView
            source={{ uri: headerYoutubeEmbedUrl }} // Dùng trực tiếp URL embed
            style={styles.webview}
            javaScriptEnabled={true}
            allowsFullscreenVideo={true}
            // mediaPlaybackRequiresUserAction={false}
          />
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden'
  },
  webview: {
    width: '100%',
    height: HEADER_HEIGHT
  },
  content: {
    flex: 1,
    padding: 19,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: '#F2EFE7'
  }
})
