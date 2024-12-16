import { Local, TripEntity } from '@/entities/trip'

export namespace CreateTrip {
  export type Input = Omit<
    TripEntity,
    'id' | 'createdAt' | 'updatedAt' | 'locals'
  > & {
    userId: string
    locals: Omit<Local, 'id'>[]
  }

  export interface Output {}
}

export namespace GetTrips {
  export type Input = {
    userId: string
  }

  export type Output = TripEntity[]
}
