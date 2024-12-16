'use client'

import { useSearchParams } from 'next/navigation'
import { ListTripPageContent } from './content'

export default function ListTripPage() {
  const searchParams = useSearchParams()
  const city = searchParams.get('city')

  return <ListTripPageContent city={city} />
}
