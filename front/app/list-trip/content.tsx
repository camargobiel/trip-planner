import { LocalList } from '@/components/custom/local-list'
import { PageLayout } from '../page-layout'
import { Location } from '@/types/location'
import { LoadingScreen } from '@/components/custom/loading-screen'
import { useApi } from '@/hooks/use-api'

export function ListTripPageContent({ city }: { city: string | null }) {
  const { data: location } = useApi<Location>(
    `http://localhost:6969/trips/generate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
      credentials: 'include',
      runWhenBuild: true,
    },
  )

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
