import { useEffect, useState } from 'react'
import { LocalList } from '@/components/custom/local-list'
import { PageLayout } from '../page-layout'
import { Location } from '@/types/location'
import { LoadingScreen } from '@/components/custom/loading-screen'
import { toast } from '@/hooks/use-toast'
import { UserEntity } from '@/types/user'

export function ListTripPageContent({ city }: { city: string | null }) {
  const [location, setLocation] = useState<Location | null>(null)
  const [user, setUser] = useState<UserEntity | null>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:6969/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.status !== 200) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o usuário',
          variant: 'destructive',
        })
        return
      }
      const data = await response.json()
      console.log('data', data)
      setUser(data)
    }
    if (!user) {
      fetchData()
    }
  }, [user])

  useEffect(() => {
    async function generateTrip() {
      const response = await fetch(`http://localhost:6969/trips/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
        credentials: 'include',
      })
      const data: Location = await response.json()
      setLocation(data)
    }
    if (!location && user) {
      generateTrip()
    }
  }, [city, location, user])

  if (!location) {
    return <LoadingScreen />
  }

  return (
    <PageLayout>
      <main className="flex-1 container mx-auto p-10 bg-zinc-950 rounded-xl flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{location.city}</h1>
        <p
          className="text-lg text-zinc-400 mb-6"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {location.description}
        </p>
        {location && <LocalList locals={location.locals} />}
      </main>
    </PageLayout>
  )
}
