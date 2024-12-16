'use client'

import { Local } from '@/types/location'
import { LocalCard } from './local-card'

interface LocalListProps {
  locals: Local[]
}

export function LocalList({ locals }: LocalListProps) {
  if (!locals?.length) {
    return <div>No locals found</div>
  }

  return (
    <div className="flex gap-4 h-full w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto pr-4 space-y-6">
        {locals.map((local) => (
          <LocalCard key={local.name} local={local} />
        ))}
      </div>
    </div>
  )
}
