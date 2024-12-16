import { UserEntity } from '@/entities/user'

declare global {
  namespace Express {
    interface Request {
      user: UserEntity | null | undefined
    }
  }
}
