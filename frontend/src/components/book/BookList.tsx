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
import { useEffect, useRef, useState } from 'react'
import { getBooks } from '@/services/bookServices'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export function BookList({ books: initialBooks }: { books: BookListItem[] }) {
  const [books, setBooks] = useState<BookListItem[]>(initialBooks)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(6)
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [keyword, setKeyword] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

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
      <div className='mb-6'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (searchInputRef.current) {
              setKeyword(searchInputRef.current.value)
            }
          }}
        >
          <label>
            <h2 className='font-semibold text-lg mb-2'>
              키워드 검색 (책 제목, 저자, 장르)
            </h2>
            <div className='flex gap-2'>
              <Input placeholder='검색어를 입력해주세요' ref={searchInputRef} />
              <div className='flex gap-1'>
                <Button type='submit'>검색</Button>
                <Button
                  variant={'outline'}
                  onClick={() => {
                    if (searchInputRef.current) {
                      setKeyword('')
                      searchInputRef.current.value = ''
                    }
                  }}
                >
                  초기화
                </Button>
              </div>
            </div>
          </label>
        </form>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6'>
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
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}
