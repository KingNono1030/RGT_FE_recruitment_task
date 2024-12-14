import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { router as booksRouter } from './routes/books'
import { connectDB } from './config/database'

dotenv.config()

export const app: Application = express()

app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
})

app.use('/api/books', booksRouter)

connectDB()
