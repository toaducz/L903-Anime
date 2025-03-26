import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, TextInput, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSeasonalAnime } from '@/API/getSeasonalAnime';
import AnimeItem from '@/components/anime/anime-item';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import Loading from '@/components/loading/loading';

export default function SearchScreen() {
    const router = useRouter()
    const d = new Date()
    const seasons = {
        winter: ["January", "February", "March"],
        spring: ["April", "May", "June"],
        summer: ["July", "August", "September"],
        fall: ["October", "November", "December"],
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState(d.getFullYear());
    const [selectedSeason, setSelectedSeason] = useState('winter');

    useEffect(() => {
        const monthNames = Object.keys(seasons);
        const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

        const season = monthNames.find((season) =>
            seasons[season as keyof typeof seasons].includes(currentMonth)
        );

        if (season) {
            setSelectedSeason(season);
        }
    }, []);


    const { data: season, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, isSuccess } = useSeasonalAnime({
        year: String(selectedYear),
        season: selectedSeason,
    });

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
            <View style={styles.container}>
                {/* Thanh SearchBar */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Tìm kiếm anime..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* Selector cho năm và mùa */}
                <View style={styles.selectorContainer}>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.label}>Năm:</Text>
                        <Picker
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            style={styles.picker}
                        >
                            {Array.from(
                                { length: new Date().getFullYear() + 1 - 1996 + 1 },
                                (_, i) => new Date().getFullYear() + 1 - i
                            ).map((year) => (
                                <Picker.Item key={year} label={`${year}`} value={year} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.label}>Mùa:</Text>
                        <Picker
                            selectedValue={selectedSeason}
                            onValueChange={(itemValue) => setSelectedSeason(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Xuân" value="spring" />
                            <Picker.Item label="Hè" value="summer" />
                            <Picker.Item label="Thu" value="fall" />
                            <Picker.Item label="Đông" value="winter" />
                        </Picker>
                    </View>
                </View>
                {season?.pages[0]?.data.length === 0 ? (<View><Text style={[styles.horizontal, styles.selectorContainer, styles.title]}>Không có kết quả!</Text></View>) : (<FlatList
                    endFillColor={'default'}
                    data={season?.pages.flatMap((page) => page?.data)}
                    numColumns={2}
                    renderItem={({ item }) => <AnimeItem season={item!} onPress={() => router.push({ pathname: '/anime-detail', params: { mal_id: item?.mal_id } })} />}
                    keyExtractor={(item) => item!.mal_id}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    style={styles.flatList}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <ActivityIndicator size="large" style={[styles.container, styles.horizontal, styles.padding]} />
                        ) : null
                    }
                    initialNumToRender={10}
                />)

                }

            </View>
        </SafeAreaView>
    );
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
        padding: 10,
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
        shadowRadius: 4,
    },
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    pickerWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    picker: {
        height: 54,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    flatList: {
        flex: 1,
        // paddingLeft: 18
        paddingBottom: 100
    },
    title: {
        paddingTop: 40,
        fontSize: 20,
        color: "black",
        textAlign: 'center'
    },

});
