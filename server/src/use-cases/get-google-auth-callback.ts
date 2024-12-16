/* eslint-disable camelcase */
import { UsersRepository } from '@/repositories'
import chalk from 'chalk'
import { Request, Response } from 'express'

export class GetGoogleAuthCallback {
  constructor(private readonly usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(req: Request, res: Response) {
    const { code } = req.query

    try {
      const data = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
      })
      const { access_token } = await data.json()

      const userProfile = await fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      )
      const profile = await userProfile.json()
      const user = await this.usersRepository.findUser({ email: profile.email })
      if (!user) {
        await this.usersRepository.createUser({
          email: profile.email,
          name: profile.name,
          googleId: profile.id,
          picture: profile.picture,
        })
      }
      res.cookie('token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      res.redirect(302, `${process.env.FRONT_END_URL}/generate-trip`)
    } catch (error) {
      console.error(chalk.red('Error:', error))
      res.status(400).json({ error: 'User not found' })
    }
  }
}
