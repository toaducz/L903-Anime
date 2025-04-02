import { queryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { request } from '../utils/request'
import { Pagination } from './pagination'

export type SeasonalAnimes = {
  data: Seasonal[]
  pagination: Pagination
}

export type Seasonal = {
  images: images
  mal_id: string
  score: number
  trailer: trailer
  type: string
  title: string
  title_english: string
  episodes: number
  year: number
  genres: genres[]
  season: string
}

type genres = {
  mal_id: string
  name: string
  type: string
  url: string
}

type images = {
  jpg: jpg
  webp: webp
}

type jpg = {
  image_url: string
  large_image_url: string
  small_image_url: string
}

type webp = {
  image_url: string
  large_image_url: string
  small_image_url: string
}

type trailer = {
  url: string
  embed_url: string
  images: images
}

type SeasonalRequest = {
  year?: string
  season?: string
  page?: number
  limit?: number
}

type limit = {
  limit?: number
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const useSeasonalAnimeNow = ({ limit }: SeasonalRequest) => {
  return useInfiniteQuery({
    queryKey: ['use-seasonal-anime-now'],
    queryFn: async ({ pageParam = 1 }) => {
      await delay(1000)
      return request<SeasonalAnimes>('seasons/now', 'GET', {
        page: pageParam,
        filter: 'tv',
        sfw: '',
        order_by: 'score',
        sort: 'desc'
      })
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => (lastPage?.pagination.has_next_page ? lastPage?.pagination.current_page + 1 : null)
  })
}

export const getSeasonalAnimeNow = ({ limit }: { limit: number }) => {
  return queryOptions({
    queryKey: ['get-seasonal-anime-now'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      return request<SeasonalAnimes>(`seasons/now`, 'GET', { limit })
    },
    staleTime: 10000
  })
}

export const getTopAnimeNow = ({ limit }: { limit: number }) => {
  return queryOptions({
    queryKey: ['get-top-anime-now'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      return request<SeasonalAnimes>(`top/anime`, 'GET', {
        limit: limit,
        type: 'tv',
        sfw: ''
      })
    },
    staleTime: 10000
  })
}

export const useSeasonalAnime = ({ year, season, page }: SeasonalRequest) => {
  return useInfiniteQuery({
    queryKey: ['use-seasonal-anime', year, season],
    queryFn: ({ pageParam = 1 }) =>
      request<SeasonalAnimes>(`seasons/${year}/${season}`, 'GET', {
        page: pageParam,
        filter: 'tv',
        sfw: '',
        order_by: 'score',
        sort: 'desc'
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => (lastPage?.pagination.has_next_page ? lastPage?.pagination.current_page + 1 : null)
  })
}

export const useSeasonalUpcoming = () => {
  return useInfiniteQuery({
    queryKey: ['use-seasonal-anime-upcoming'],
    queryFn: ({ pageParam = 1 }) =>
      request<SeasonalAnimes>(`seasons/upcoming`, 'GET', {
        page: pageParam,
        filter: 'tv',
        sfw: '',
        order_by: 'score',
        sort: 'desc'
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => (lastPage?.pagination.has_next_page ? lastPage?.pagination.current_page + 1 : null)
  })
}
