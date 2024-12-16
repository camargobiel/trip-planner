'use client'

import { useRouter } from 'next/navigation'
import { CirclePlusIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { UserEntity } from '@/types/user'
import { Separator } from '../ui/separator'
import { GoogleIcon } from './google-icon'
import { toast } from '@/hooks/use-toast'
import { Trip } from '@/types/trip'
import { format } from 'date-fns'

export function Sidebar() {
  const router = useRouter()
  const [user, setUser] = useState<UserEntity | null>(null)
  const [lastTrips, setLastTrips] = useState<Trip[]>([])

  const handleNewItinerary = () => {
    router.push('/generate-trip')
  }

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:6969/auth/google'
  }

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
    async function fetchData() {
      const response = await fetch(`http://localhost:6969/trips`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.status !== 200) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os itinerários',
          variant: 'destructive',
        })
        return
      }
      const data = await response.json()
      console.log('data', data)
      setLastTrips(data)
    }
    if (!lastTrips.length && user) {
      fetchData()
    }
  }, [lastTrips, user])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr] bg-zinc-950 p-5 rounded-xl">
      <div className="flex flex-col gap-6">
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.picture} />
              <AvatarFallback>
                <span>{user.name[0]}</span>
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-lg font-medium">{user.name}</span>
              <span className="text-sm text-gray-400 block">{user.email}</span>
            </div>
          </div>
        ) : (
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={loginWithGoogle}
          >
            <GoogleIcon />
            Entrar com Google
          </Button>
        )}

        <Separator />

        <Button className="w-full" onClick={handleNewItinerary}>
          <CirclePlusIcon className="w-5 h-5" />
          Novo itinerário
        </Button>

        {user ? (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-400">
              Últimos itinerários
            </h2>
            <div className="space-y-4 overflow-y-auto">
              {lastTrips.map((trip) => (
                <Button
                  key={trip.id}
                  variant="outline"
                  className="w-full justify-start p-3 px-5 h-fit"
                >
                  <div className="w-full flex flex-col justify-start gap-1 text-start">
                    <span className="text-gray-200">{trip.city}</span>
                    <span className="text-gray-500">
                      {format(new Date(trip.created_at), 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <p
            className="text-gray-400 text-sm text-center"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            Faça login para ver seus últimos itinerários
          </p>
        )}
      </div>
    </div>
  )
}
