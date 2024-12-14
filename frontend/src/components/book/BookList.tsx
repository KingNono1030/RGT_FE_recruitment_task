import { BookCard } from './BookCard'
import type { BookListItem } from '@/types/Book.types'

export function BookList({ books }: { books: BookListItem[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {books.map((book) => (
        <BookCard
          key={book._id}
          _id={book._id}
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
