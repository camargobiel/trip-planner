import { CitiesProvider } from '@/providers'
import { GetCitiesUseCase } from '@/use-cases/get-cities'
import { Router } from 'express'

const citiesRoutes = Router()

const getCitiesUseCase = new GetCitiesUseCase(new CitiesProvider())

citiesRoutes.get('/', (req, res) => getCitiesUseCase.execute(req, res))

export { citiesRoutes }
