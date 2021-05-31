import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEvents() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/events`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useRegions() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/regions`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useLocations() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/locations`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function usePlaces() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/places`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEvent(id: string) {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(id ? `/api/events/${id}` : null, fetcher, options)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useKitchens() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/kitchens`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useSpecialMenu() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/special_menu`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useFacilities() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/facilities`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useAveragePrices() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/average_prices`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMenuByEvent(eventId: string) {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(eventId ? `/api/events/${eventId}/menu` : null, fetcher, options)
  return {
    data,
    isLoading: !error && !data,
  }
}

export function useTours() {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(`/api/dict/tours`, fetcher, options)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useContentByEvent(eventId: string) {
  const options = {}
  const { data, error, isValidating, mutate } = useSWR(eventId ? `/api/events/${eventId}/content` : null, fetcher, options)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}