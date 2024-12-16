import { TripEntity } from '@/entities/trip'
import { CreateTrip, GetTrips } from './trip-repository.types'
import dbClient from '@/database'

export class TripRepository {
  async createTrip({
    city,
    description,
    locals,
    userId,
  }: CreateTrip.Input): Promise<CreateTrip.Output> {
    const trip = await dbClient.querySingle<{ id: string }>(
      `
      select (
        INSERT Trip {
            city := <str>$city,
            description := <str>$description,
            user := (SELECT User FILTER .id = <uuid>$userId),
            created_at := <datetime>$now,
        }
      ) { id };
    `,
      {
        city,
        description,
        userId,
        now: new Date(),
      },
    )

    if (!trip) {
      throw new Error('Failed to create trip')
    }

    await Promise.all(
      locals.map(
        async ({
          name,
          address,
          description,
          googleLink,
          openingHours,
          price,
          tags,
        }) => {
          await dbClient.execute(
            `
          INSERT Local {
            name := <str>$name,
            address := <str>$address,
            description := <str>$description,
            google_link := <str>$googleLink,
            opening_hours := <str>$openingHours,
            price := <str>$price,
            tags := <array<str>>$tags,
            trip := (SELECT Trip FILTER .id = <uuid>$tripId),
          }
        `,
            {
              name,
              address,
              description,
              googleLink,
              openingHours,
              price,
              tags,
              tripId: trip.id,
            },
          )
        },
      ),
    )

    return {}
  }

  async getTrips({ userId }: GetTrips.Input): Promise<GetTrips.Output> {
    const trips = await dbClient.query<TripEntity>(
      `
      SELECT Trip {
        id,
        city,
        description,
        created_at,
      } FILTER .user.id = <uuid>$userId
      ORDER BY .created_at desc;
    `,
      {
        userId,
      },
    )
    return trips
  }
}
