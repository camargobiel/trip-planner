import { UsersRepository } from '@/repositories'
import chalk from 'chalk'
import { Request, Response } from 'express'

export class GetMe {
  constructor(private readonly usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(req: Request, res: Response) {
    const token = req.cookies.token
    if (!token) {
      return
    }
    try {
      const userProfile = await fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const profile = await userProfile.json()
      if (!profile.email) {
        return
      }
      const user = await this.usersRepository.findUser({ email: profile.email })
      res.status(200).json(user)
    } catch (error) {
      console.error(chalk.red('Error:', error))
      res.status(400).json({ error: 'User not found' })
    }
  }
}
