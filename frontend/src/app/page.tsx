import { BookList } from '@/components/book/BookList'
import { Button } from '@/components/ui/button'
import { getBooks } from '@/services/bookServices'
import type { BookListItem } from '@/types/Book.types'
import Link from 'next/link'

export default async function HomePage() {
  const data = await getBooks()
  const books: BookListItem[] = data

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>지금 유행하고 있는 책</h2>
        <Link href={'/books/add'}>
          <Button variant='outline' size={'sm'}>
            책 추가
          </Button>
        </Link>
      </div>
      <BookList books={books} />
    </>
  )
}
