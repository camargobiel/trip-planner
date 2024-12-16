import { PageLayout } from '@/app/page-layout'
import React from 'react'

export const LoadingScreen: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center bg-zinc-950 rounded-xl w-full">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-4 border-primary/30 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border-t-4 border-primary/10 rounded-full animate-spin-slower"></div>
        </div>
        <p className="text-2xl font-semibold text-gray-200">
          Gerando sua viagem
        </p>
        <div className="mt-4 flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </PageLayout>
  )
}
