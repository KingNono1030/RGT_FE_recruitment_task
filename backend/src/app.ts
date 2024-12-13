import express, { Application } from 'express'
import dotenv from 'dotenv'
import { router as booksRouter } from './routes/books'
import { connectDB } from './config/database'

dotenv.config()

export const app: Application = express()

app.use(express.json())

app.use('/api/books', booksRouter)

connectDB()
