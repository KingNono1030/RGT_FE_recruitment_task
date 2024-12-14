import api from '@/lib/api'
import { CreateBookRequest, UpdateBookRequest } from '@/types/Book.types'

const BOOK_END_POINT = '/api/books'

export const getBooks = async ({
  page = 1,
  limit = 10,
  sort = 'desc',
  search = '',
}) => {
  const endpoint = `?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  const response = await api.get(`${BOOK_END_POINT}${endpoint}`)
  return response.data
}

export const getBookById = async (id: string) => {
  const response = await api.get(`${BOOK_END_POINT}/${id}`)
  return response.data
}

export const createBook = async (bookData: CreateBookRequest) => {
  const response = await api.post(BOOK_END_POINT, bookData)
  return response.data
}

export const updateBook = async (id: string, bookData: UpdateBookRequest) => {
  const response = await api.put(`${BOOK_END_POINT}/${id}`, bookData)
  return response.data
}

export const deleteBook = async (id: string) => {
  const response = await api.delete(`${BOOK_END_POINT}/${id}`)
  return response.data
}
