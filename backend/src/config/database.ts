import mongoose from 'mongoose'

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || ''
  if (!MONGO_URI) {
    throw new Error('MongoDB URI is not defined in environment variables.')
  }
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}
