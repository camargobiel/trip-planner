export interface Local {
  id: string
  name: string
  description: string
  address: string
  openingHours: string
  tags: string[]
  price: string
  googleLink: string
}

export interface TripEntity {
  id: string
  city: string
  description: string
  locals: Local[]
  createdAt: Date
  updatedAt: Date
}
