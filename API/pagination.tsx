export type Pagination = {
  current_page: number
  has_next_page: boolean | null
  last_visible_page: number
  items: items
}

type items = {
  count: string
  per_page: string
  total: string
}
