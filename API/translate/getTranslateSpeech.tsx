import { queryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { request } from '@/utils/request'

export type Text = {
    alternatives: string[]
    translatedText: string
}

export const getTranslate = (text: string) => {
    return queryOptions({
        queryKey: ['get-translate'],
        queryFn: () => request<Text>("", 'GET', {
            q: text,
            source: "en",
            target: "vi",
            format: "text",
            alternatives: 3,
            api_key: ""
        },
            `https://libretranslate.com/translate`),
        staleTime: 36000
    })
}
