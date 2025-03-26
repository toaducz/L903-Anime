import React, { useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { useQuery } from '@tanstack/react-query';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Hook để lấy params trong expo-router
import { getAnimeById } from '@/API/getAnimeDetail';
import Loading from '@/components/loading/loading';
import { WebView } from "react-native-webview";
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

export default function AnimeDetail() {
    const { mal_id } = useLocalSearchParams();
    const id = String(mal_id)
    const { data: anime, isLoading, isSuccess, isError } = useQuery(getAnimeById({ id: id }))

    const getSeasonInVietnamese = (season: string): string => {
        const seasonMap: { [key: string]: string } = {
            spring: 'Xuân',
            summer: 'Hạ',
            fall: 'Thu',
            winter: 'Đông',
        };

        const normalizedSeason = season.toLowerCase();

        return seasonMap[normalizedSeason] || 'Không xác định';
    };

    if (isSuccess) {
        console.log(anime?.data.images.jpg.large_image_url)
    }

    if (isError) {
        return (<Text style={[styles.title, styles.containerCenter]}>Có lỗi xảy ra vui lòng thử lại!</Text>)
    }

    if (isLoading) {
        return (<Loading />)
    }
    const genresList = anime?.data?.genres?.map(genre => genre.name).join(', ') || 'Không có thể loại';

    const studio = anime?.data?.studios?.length! > 0 ? anime?.data.studios[0].name : 'Không rõ';
    return (
        <CustomParallaxScrollView
            headerBackgroundColor={'#A1CEDC'}
            headerYoutubeEmbedUrl={anime?.data.trailer.embed_url ?? "https://www.youtube.com/embed/Gl4bf3Gppyo?si=YCeKHdGgHs4nwaZz"}
        >
            <Text style={[styles.title, styles.containerCenter, styles.card]}>{anime?.data.title}</Text>
            <View style={styles.card}>
                <View >
                    <Text>
                        <Text style={[styles.fontText]}>Mùa:</Text> <Text style={[styles.text]}>{getSeasonInVietnamese(anime?.data.season ?? "")} {anime?.data.year ?? "Không rõ"}</Text>
                    </Text>
                    <Text>
                        <Text style={[styles.fontText]}>Điểm:</Text>  <Text style={[styles.text]}>{anime?.data.score ?? "Không rõ"}/10</Text>
                    </Text>
                    <Text>
                        <Text style={[styles.fontText]}>Số tập:</Text>  <Text style={[styles.text]}>{anime?.data.episodes ?? "Chưa rõ"}</Text>
                    </Text>
                    <Text>
                        <Text style={[styles.fontText]}>Thể loại: </Text> <Text style={[styles.text]}>{genresList}</Text>
                    </Text>
                    <Text>
                        <Text style={[styles.fontText]}>Studio:</Text>  <Text style={[styles.text]}>{studio}</Text>
                    </Text>
                    <Text>
                        <Text style={[styles.fontText]}>Tình trạng: </Text> <Text style={[styles.text]}>{anime?.data.status ?? "Không rõ"}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.card}>
                <Collapsible title="Nội dung">
                    <ThemedText>
                        {anime?.data.synopsis ?? "Quá lỏ nên tạm chưa có nội dung"}

                    </ThemedText>
                    <ExternalLink href={anime?.data.url ?? ""}>
                        <ThemedText type="link">Chi tiết</ThemedText>
                    </ExternalLink>
                </Collapsible>
                {/* <Text style={[styles.subTitle]}>Nội dung:</Text>
                <Text style={{ paddingBottom: 20 }}>{anime?.data.synopsis ?? "Quá lỏ nên tạm chưa có nội dung"}</Text> */}
            </View>
            <View style={styles.card}>
                <Collapsible title="Hình ảnh">
                    <Image
                        source={{ uri: anime?.data.images.jpg.large_image_url }}
                        resizeMode="cover"

                    >
                    </Image>
                </Collapsible>
                {/* <Text style={[styles.subTitle]}>Nội dung:</Text>
                <Text style={{ paddingBottom: 20 }}>{anime?.data.synopsis ?? "Quá lỏ nên tạm chưa có nội dung"}</Text> */}
            </View>
            <View style={{ paddingBottom: 200 }}></View>
        </CustomParallaxScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    containerCenter: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerVideo: {
        width: "100%",
        height: 250, // Điều chỉnh kích thước theo nhu cầu
    },
    video: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
    fontText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    subTitle: {
        fontWeight: '700',
        paddingBottom: 15
    },
    card: {
        backgroundColor: '#fff', // Nền trắng
        padding: 16, // Padding bên trong 16
        borderRadius: 12, // Bo tròn
        elevation: 4, // Đổ bóng cho Android
        shadowColor: '#000', // Đổ bóng cho iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});