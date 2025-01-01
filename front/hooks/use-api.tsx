import { useState, useCallback, useEffect } from 'react'

interface Params extends RequestInit {
  query?: string
}

interface UseApiOptions extends RequestInit {
  runWhenBuild?: boolean
}

export function useApi<T>(
  url: string,
  options: UseApiOptions = {},
): {
  data: T | null
  loading: boolean
  fetchData: (params?: Params) => void
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(
    async (params?: Params) => {
      setLoading(true)
      const response = await fetch(`${url}${params?.query || ''}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...params,
      })
      const data = await response.json()
      setData(data)
      setLoading(false)
    },
    [url, options],
  )

  useEffect(() => {
    if (options.runWhenBuild && data === null) {
      fetchData()
    }
  }, [fetchData, options.runWhenBuild, data])

  return { data, loading, fetchData }
}
