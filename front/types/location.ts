export interface Local {
  name: string
  description: string
  address: string
  openingHours: string
  tags: string[]
  price: 'Gratuito' | 'Barato' | 'Moderado' | 'Caro'
  googleLink: string
  imageUrl: string
}

export interface Location {
  city: string
  description: string
  locals: Local[]
}
