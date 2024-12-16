'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
import { cn } from '@/lib/utils'

const PAGES_BY_GROUP = 5
const LIMIT_BY_PAGE = 10

export function BookList({ books: initialBooks }: { books: BookListItem[] }) {
  const [books, setBooks] = useState<BookListItem[]>(initialBooks)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [keyword, setKeyword] = useState('')
  const [pageGroup, setPageGroup] = useState<number[]>([1, 2, 3, 4, 5])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBooks({
        page,
        limit: LIMIT_BY_PAGE,
        sort: order,
        search: keyword,
      })
      const newBooks: BookListItem[] = data.books
      setBooks(() => newBooks)
      setTotalPages(() => data.totalPages)
    }
    fetchData()
  }, [page, order, keyword])

  return (
    <section>
      <div className='mb-2'>
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
      <div className='mb-6 flex justify-end items-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger className='border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
            정렬
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setOrder(() => 'desc')
              }}
            >
              최신순
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOrder(() => 'asc')
              }}
            >
              오래된순
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
              <PaginationPrevious
                onClick={() => {
                  if (pageGroup[0] > PAGES_BY_GROUP) {
                    setPageGroup((prev) => prev.map((i) => i - PAGES_BY_GROUP))
                    setPage(
                      (prev) =>
                        (Math.ceil(prev / PAGES_BY_GROUP) - 2) *
                          PAGES_BY_GROUP +
                        1
                    )
                  }
                }}
                className='cursor-pointer'
              />
            </PaginationItem>
            {pageGroup.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => {
                    setPage(pageNum)
                  }}
                  className={cn(
                    'cursor-pointer',
                    {
                      'bg-blue-500 text-white hover:bg-blue-500 hover:text-white':
                        pageNum === page,
                    },
                    { 'pointer-events-none': pageNum > totalPages }
                  )}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (totalPages > pageGroup[pageGroup.length - 1]) {
                    setPageGroup((prev) => prev.map((i) => i + PAGES_BY_GROUP))
                    setPage(
                      (prev) =>
                        Math.ceil(prev / PAGES_BY_GROUP) * PAGES_BY_GROUP + 1
                    )
                  }
                }}
                className='cursor-pointer'
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}
