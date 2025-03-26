import { queryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { request } from '../utils/request'
import { Pagination } from './pagination'

export type SeasonalAnimes = {
  data: Seasonal[],
  pagination: Pagination
}

export type Seasonal = {
  images: images,
  mal_id: string, 
  score: number,
  trailer: trailer
  type: string,
  title: string,
  title_english: string,
  episodes: number,
  year: number,
  genres: genres[],
  season: string
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

type trailer = {
  url: string,
  embed_url: string,
  images: images
}

type SeasonalRequest = {
    year: string
    season: string
    page?: number
}

export const getSeasonalAnimeNow = () => {
  return useInfiniteQuery({
    queryKey: ['get-seasonal-anime'],
    queryFn: ({pageParam = 1}) =>
      request<SeasonalAnimes>(`seasons/now`, 'GET',{
        page: pageParam,
        filter: "tv",
        sfw: ""
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => (lastPage?.pagination.has_next_page ? lastPage?.pagination.current_page + 1 : null),
  })
}


export const useSeasonalAnime = ({ year, season, page }:SeasonalRequest) => {
  return useInfiniteQuery({
    queryKey: ['use-seasonal-anime', year, season],
    queryFn: ({pageParam = 1}) =>
      request<SeasonalAnimes>(`seasons/${year}/${season}`, 'GET',{
        page: pageParam,
        filter: "tv",
        sfw: ""
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => (lastPage?.pagination.has_next_page ? lastPage?.pagination.current_page + 1 : null),
  })
}
