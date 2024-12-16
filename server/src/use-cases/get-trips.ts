import { TripRepository } from '@/repositories/trip-repository/trip-repository'
import { statusCode } from '@/shared/status-code'
import chalk from 'chalk'
import { Request, Response } from 'express'
import { z } from 'zod'

export class GetTripsUseCase {
  public readonly inputSchema = z.object({})

  constructor(private readonly tripRepository: TripRepository) {
    this.tripRepository = tripRepository
  }

  async execute(req: Request, res: Response) {
    const user = req.user

    if (!user) {
      res.status(statusCode.NO_CONTENT).send()
      return
    }

    try {
      const trips = await this.tripRepository.getTrips({
        userId: user.id,
      })
      res.status(statusCode.OK).send(trips)
    } catch (error) {
      console.error(chalk.red(error))
      res.status(statusCode.INTERNAL_SERVER_ERROR).send()
    }
  }
}
