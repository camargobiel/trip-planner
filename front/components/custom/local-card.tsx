import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Local } from '@/types/location'
import { MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react'

interface LocalCardProps {
  local: Local
}

export function LocalCard({ local }: LocalCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{local.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {local.address}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">{local.description}</p>
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
          <Clock className="w-4 h-4" />
          {local.openingHours}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
          <DollarSign className="w-4 h-4" />
          {local.price}
        </div>
        <div className="flex flex-wrap gap-2">
          {local.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a
            href={local.googleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Ver no Google
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
