import { Sidebar } from '@/components/custom/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { PropsWithChildren } from 'react'

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen p-5 gap-5">
      <Sidebar />
      <Toaster />
      {children}
    </div>
  )
}
