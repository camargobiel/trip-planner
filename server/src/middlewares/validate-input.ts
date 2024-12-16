import { Request, Response, NextFunction } from 'express'

export function validateInput(inputSchema: Zod.AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = inputSchema.parse(req.body)
      req.body = data
      next()
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}
