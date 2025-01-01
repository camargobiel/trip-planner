import { CitiesProvider } from '@/providers'
import { statusCode } from '@/shared/status-code'
import { Request, Response } from 'express'
import { z } from 'zod'

export class GetCitiesUseCase {
  public readonly inputSchema = z.object({
    city: z.string(),
  })

  constructor(private readonly citiesProvider: CitiesProvider) {
    this.citiesProvider = citiesProvider
  }

  async execute(req: Request, res: Response) {
    const query = req.query as z.infer<
      typeof GetCitiesUseCase.prototype.inputSchema
    >
    const cities = await this.citiesProvider.getCities({
      city: query.city,
    })
    res.status(statusCode.OK).json(cities)
  }
}
