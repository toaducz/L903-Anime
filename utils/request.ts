type MethodType = 'POST' | 'GET'
type HeaderType = { [key: string]: any }

export async function request<T, P = any>(
  endpoint: string,
  method: MethodType = 'GET',
  payload?: P,
  url?:string,
  headers: HeaderType = {},
): Promise<T | null> {
  const options: RequestInit = {
    // method,
    // credentials: 'include',
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
      ...headers
    }
  }

  let params = ''
  if (method === 'POST') {
    options.body = JSON.stringify(payload)
  } else if (method === 'GET') {
    if (payload) {
      params = `?${new URLSearchParams(payload).toString()}`
    }
  }
  const API_URL = 'https://api.jikan.moe/v4'
  const response = await fetch(`${url ? url : API_URL}/${endpoint}${params}`, options)
  try {
    return (await response.json()) as T
  } catch (error) {
    return null
  }
}
