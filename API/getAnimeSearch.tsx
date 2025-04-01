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

type SearchRequest = {
  q: string
  order_by: string
  sort: string
  page?: number
}

export const useSearchAnime = ({ q, page, sort, order_by }: SearchRequest) => {
  return useInfiniteQuery({
    queryKey: ['use-search-anime', q, order_by, sort],
    queryFn: ({ pageParam = 1 }) =>
      request<SeasonalAnimes>(`anime`, 'GET', {
        page: pageParam,
        q: q,
        filter: 'tv',
        sfw: true,
        order_by: order_by,
        sort: sort
      }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => (lastPage?.pagination.has_next_page ? lastPage?.pagination.current_page + 1 : null)
  })
}
