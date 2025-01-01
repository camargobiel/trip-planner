'use client'

import { Sidebar } from '@/components/custom/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { UserContext } from '@/context/user-context'
import { useApi } from '@/hooks/use-api'
import { UserEntity } from '@/types/user'
import { PropsWithChildren } from 'react'

export function PageLayout({ children }: PropsWithChildren) {
  const { data: user } = useApi<UserEntity | null>(
    'http://localhost:6969/auth/me',
    {
      runWhenBuild: true,
    },
  )

  return (
    <UserContext.Provider value={user}>
      <div className="flex h-screen p-5 gap-5">
        <Sidebar />
        <Toaster />
        {children}
      </div>
    </UserContext.Provider>
  )
}
