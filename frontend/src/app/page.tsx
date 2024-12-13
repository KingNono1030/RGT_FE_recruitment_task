import { BookList } from '@/components/book/BookList'
import type { Book } from '@/types/Book.types'

export default function HomePage() {
  const books: Book[] = [
    {
      title: '채식주의자',
      author: '한강',
      publishedDate: '2012.01.01',
      genre: '소설',
      summary: '어느날 누구누구는 누구누구를 만나 어떻게 되고 마는데...',
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      publishedDate: '2012.01.01',
      genre: '소설',
      summary: '어느날 누구누구는 누구누구를 만나 어떻게 되고 마는데...',
    },
  ]

  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Featured Books</h2>
      <BookList books={books} />
    </>
  )
}
