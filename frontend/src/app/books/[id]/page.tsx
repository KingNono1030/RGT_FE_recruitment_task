import { DeleteBookButton } from '@/components/book/DeleteBookButton'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { getBookById } from '@/services/bookServices'
import type { BookListItem } from '@/types/Book.types'
import Image from 'next/image'
import Link from 'next/link'

interface BookDetailPageProps {
  params: {
    id: string
  }
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params
  const data = await getBookById(id)
  const book: BookListItem = data

  return (
    <div className='xl:gap-4 p-4 md:p-6'>
      <h2 className='text-xl font-bold mb-4'>책 상세보기</h2>
      <div className='flex flex-col md:flex-row gap-4 '>
        <div className='w-full relative min-h-20 md:w-[340px] md:h-[340px] xl:w-[486px] xl:h-[486px] rounded-xl md:rounded-2xl overflow-hidden'>
          <Image src={'https://picsum.photos/600'} fill alt='책 임시 이미지' />
        </div>
        <div className='flex-grow'>
          <div className='pb-4 border-solid border-b-2 border-gray-800 mb-6 flex justify-between'>
            <div>
              <h1 className='text-2xl mb-4 font-semibold'>{book.title}</h1>
              <h2 className='text-4xl font-semibold'>{book.author}</h2>
            </div>
            <div className='flex gap-2'>
              <Link href={`/books/${id}/edit`}>
                <Button variant={'secondary'}>수정</Button>
              </Link>
              <DeleteBookButton id={id} />
            </div>
          </div>
          <div>
            <div className='mb-2'>
              <h3 className='font-semibold'>장르</h3>
              <p>{book.genre}</p>
            </div>
            <div className='mb-2'>
              <h3 className='font-semibold'>발행일</h3>
              <p>{formatDate(book.publishedDate)}</p>
            </div>
            <div>
              <h3 className='font-semibold'>줄거리</h3>
              <p>{book.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
