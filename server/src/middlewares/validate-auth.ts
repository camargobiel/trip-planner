import { UsersRepository } from '@/repositories'
import { Request, Response, NextFunction } from 'express'

export function validateAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.cookie?.split('=')[1]
    console.log('token', token)

    if (!token) {
      next()
      return
    }

    const userProfile = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
    )
    const profile = await userProfile.json()

    if (!profile) {
      next()
      return
    }

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findUser({
      email: profile.email,
    })

    if (!user) {
      next()
    }

    req.user = user

    next()
  }
}
