import express from 'express'

import 'dotenv/config'
import cors from 'cors'
import { authRoutes, citiesRoutes, tripRoutes } from './routes'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  }),
)
app.use(cookieParser())

app.use('/trips', tripRoutes)
app.use('/auth', authRoutes)
app.use('/cities', citiesRoutes)

const port = process.env.PORT || 6969

app.listen(port, () => {
  console.log(
    chalk.green(`Server is running on ${process.env.API_URL}:${port} 🚀`),
  )
})
