import { queryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { request } from '../utils/request'
import { Pagination } from './pagination'

export type DataAnime = {
    data: Anime[]
}

export type Anime = {
    mal_id: string,
    url: string,
    images: images,
    score: number,
    trailer: trailer
    type: string,
    title: string,
    title_english: string,
    episodes: number,
    airing: boolean,
    year: number,
    synopsis: string,
    studios: studios[],
    genres: genres[],
    season: string,
    streaming: streaming[],
    status: string
}

type trailer = {
    youtube_id: string,
    url: string,
    embed_url: string,
    images: images,
}

type studios = {
    mal_id: string,
    type: string,
    name: string,
    url: string,
}

type genres = {
    mal_id: string,
    name: string,
    type: string,
    url: string
}

type images = {
    jpg: jpg
    webp: webp
}

type jpg = {
    image_url: string,
    large_image_url: string,
    small_image_url: string,
}

type webp = {
    image_url: string,
    large_image_url: string,
    small_image_url: string,
}

type streaming = {
    name: string,
    url: string,
}

type AnimeByIdRequest = {
    id: string
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getAnimeIsekai = () => {
    return queryOptions({
        queryKey: ['get-anime-isekai'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return request<DataAnime>(`anime?genres=62&order_by=start_date&sort=desc&type=tv&limit=20`, 'GET')
        },
        staleTime: 100000,
    })
}