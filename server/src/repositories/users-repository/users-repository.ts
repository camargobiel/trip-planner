import dbClient from '@/database'
import { CreateUser, FindUser } from './users-repository.types'
import { UserEntity } from '@/entities/user'

export class UsersRepository {
  async findUser({ email }: FindUser.Input): Promise<FindUser.Output> {
    const user = await dbClient.querySingle<UserEntity>(
      `
      SELECT User {
        id,
        email,
        name,
        google_id,
        picture,
        created_at,
        updated_at
      } FILTER .email = <str>$email
    `,
      { email },
    )
    return user
  }

  async createUser({
    email,
    name,
    googleId,
    picture,
  }: CreateUser.Input): Promise<CreateUser.Output> {
    await dbClient.execute(
      `
      INSERT User {
        email := <str>$email,
        name := <str>$name,
        google_id := <str>$googleId,
        picture := <str>$picture,
        created_at := <datetime>datetime_current(),
        updated_at := <datetime>datetime_current()
      }
    `,
      {
        email,
        name,
        googleId,
        picture,
      },
    )
    return {}
  }
}
