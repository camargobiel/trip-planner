'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '../page-layout'

export default function GenerateTripPage() {
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleGenerateTrip = () => {
    router.push(`/list-trip?city=${encodeURIComponent(city)}`)
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-center bg-zinc-950 rounded-xl p-4 w-full">
        <div className="w-full max-w-2xl rounded-xl border p-8 space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-bold text-center">
              Planeje sua próxima aventura
            </h1>
          </div>
          <Input
            type="text"
            placeholder="Para onde você quer ir?"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="flex justify-center">
            <Button onClick={handleGenerateTrip}>
              <span>Gerar Plano</span>
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
