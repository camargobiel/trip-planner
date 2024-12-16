import { Request, Response } from 'express'

export class GetGoogleUrlUseCase {
  execute(req: Request, res: Response) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`
    res.redirect(url)
  }
}
