import { validateAuth, validateInput } from '@/middlewares'
import { AIProvider } from '@/providers/ai-provider'
import { TripRepository } from '@/repositories/trip-repository/trip-repository'
import { GenerateTripUseCase } from '@/use-cases'
import { GetTripsUseCase } from '@/use-cases/get-trips'
import { Router } from 'express'

const tripRoutes = Router()

const generateTripUseCase = new GenerateTripUseCase(
  new AIProvider(),
  new TripRepository(),
)

tripRoutes.post(
  '/generate',
  validateAuth(),
  validateInput(generateTripUseCase.inputSchema),
  (req, res) => generateTripUseCase.execute(req, res),
)

const getTrips = new GetTripsUseCase(new TripRepository())

tripRoutes.get(
  '/',
  validateAuth(),
  validateInput(getTrips.inputSchema),
  (req, res) => getTrips.execute(req, res),
)

export { tripRoutes }
