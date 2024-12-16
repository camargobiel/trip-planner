import { UsersRepository } from '@/repositories'
import { GetMe } from '@/use-cases'
import { GetGoogleAuthCallback } from '@/use-cases/get-google-auth-callback'
import { GetGoogleUrlUseCase } from '@/use-cases/get-google-url'
import { Router } from 'express'

const authRoutes = Router()

const getGoogleUrlUseCase = new GetGoogleUrlUseCase()

authRoutes.get('/google', (req, res) => getGoogleUrlUseCase.execute(req, res))

const getGoogleAuthCallback = new GetGoogleAuthCallback(new UsersRepository())

authRoutes.get('/google/callback', (req, res) =>
  getGoogleAuthCallback.execute(req, res),
)

const getMe = new GetMe(new UsersRepository())

authRoutes.get('/me', (req, res) => getMe.execute(req, res))

export { authRoutes }
