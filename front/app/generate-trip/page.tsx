'use client'

import { Button } from '@/components/ui/button'
import { SendHorizontal, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { PageLayout } from '../page-layout'
import { Controller, useForm } from 'react-hook-form'
import generateTripValidation from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { useApi } from '@/hooks/use-api'
import { useRef, useState } from 'react'
import { CityEntity } from '@/types/city'

interface FormValues {
  city: string
}

export default function GenerateTripPage() {
  const [isCityFocused, setIsCityFocused] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  console.log('selectedCity', selectedCity)

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(generateTripValidation),
  })
  const router = useRouter()
  const { data: cities, fetchData } = useApi<CityEntity[]>(
    'http://localhost:6969/cities',
  )

  const onSubmit = ({ city }: FormValues) => {
    router.push(`/list-trip?city=${encodeURIComponent(city)}`)
  }

  const onError = () => {
    toast({
      title: 'Preencha a cidade.',
      description: 'Você precisa preencher a cidade para continuar.',
      variant: 'destructive',
    })
  }
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      fetchData({
        query: `?city=${encodeURIComponent(city)}`,
      })
    }, 1000)
  }

  return (
    <PageLayout>
      <form
        className="flex items-center justify-center bg-zinc-950 rounded-xl p-4 w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="w-full max-w-2xl rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-bold text-center">
              Planeje sua próxima aventura
            </h1>
          </div>
          <div className="relative">
            <div className="flex items-center justify-center space-x-2 h-16">
              <div className="relative w-full h-full">
                <Controller
                  name="city"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      type="text"
                      placeholder="Para onde você quer ir?"
                      value={value}
                      className={`pr-10 h-full ${isCityFocused && cities?.length && 'border-b-0 rounded-b-none'} focus-visible:ring-0`}
                      onChange={(e) => {
                        onChange(e)
                        onCityChange(e)
                      }}
                      onFocus={() => setIsCityFocused(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          setIsCityFocused(false)
                        }, 200)
                      }}
                    />
                  )}
                />
                {selectedCity && (
                  <div className="absolute inset-y-0 right-0 mr-16 flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full h-10 w-10 flex items-center justify-center"
                      onClick={() => {
                        setValue('city', '')
                        setSelectedCity('')
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button
                    type="submit"
                    className="rounded-full h-10 w-10 flex items-center justify-center"
                  >
                    <SendHorizontal />
                  </Button>
                </div>
              </div>
            </div>
            {cities?.length && isCityFocused ? (
              <div className="absolute z-10 bg-zinc-950 w-full rounded-b-xl shadow-md border">
                <ul>
                  {cities.map((city) => (
                    <li
                      key={city.id}
                      className="p-2 border-zinc-900 border-b last:border-b-0 pl-3 hover:bg-zinc-900 cursor-pointer"
                      onClick={() => {
                        setValue('city', `${city.name}, ${city.country}`)
                        setSelectedCity(city.name)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{city.name}</span>
                        <span className="text-xs text-zinc-400">
                          {city.country}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </PageLayout>
  )
}
