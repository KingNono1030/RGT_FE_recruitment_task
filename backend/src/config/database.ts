import mongoose from 'mongoose'

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || ''
  if (!MONGO_URI) {
    throw new Error('MongoDB URI 가 환경 변수에서 찾을 수 없습니다.')
  }
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB 에 연결했습니다.')
  } catch (error) {
    console.error('MongoDB 연결 에러:', error)
    process.exit(1)
  }
}
