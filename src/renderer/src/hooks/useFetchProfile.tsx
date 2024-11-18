import client from '@renderer/services/client.service'
import { TProfile } from '@renderer/types'
import { useEffect, useState } from 'react'

export function useFetchProfile(id?: string) {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [profile, setProfile] = useState<TProfile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) {
          setIsFetching(false)
          setError(new Error('No id provided'))
          return
        }

        const profile = await client.fetchProfileByBench32Id(id)
        if (profile) {
          setProfile(profile)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsFetching(false)
      }
    }

    fetchProfile()
  }, [id])

  return { isFetching, error, profile }
}
