import { UserEntity } from '@/entities/user'

export namespace CreateUser {
  export interface Input
    extends Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> {}

  export interface Output {}
}

export namespace FindUser {
  export interface Input {
    email: string
  }

  export type Output = UserEntity | null
}
