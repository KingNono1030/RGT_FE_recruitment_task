'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { BookCard } from './BookCard'
import type { BookListItem } from '@/types/Book.types'
import { useEffect, useState } from 'react'
import { getBooks } from '@/services/bookServices'

export function BookList({ books: initialBooks }: { books: BookListItem[] }) {
  const [books, setBooks] = useState<BookListItem[]>(initialBooks)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(6)
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBooks({
        page,
        limit,
        sort: order,
        search: keyword,
      })
      const newBooks: BookListItem[] = data.books
      setBooks(() => newBooks)
    }
    fetchData()
  }, [page, limit, order, keyword])

  return (
    <section>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
