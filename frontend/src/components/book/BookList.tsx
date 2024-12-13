import { BookCard } from './BookCard'
import type { Book } from '@/types/Book.types'

export function BookList({ books }: { books: Book[] }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
      {books.map((book, index) => (
        <BookCard
          key={index}
          title={book.title}
          author={book.author}
          publishedDate={book.publishedDate}
          genre={book.genre}
          summary={book.summary}
        />
      ))}
    </div>
  )
}
