import { getBookById } from '@/services/bookServices'
import type { BookListItem } from '@/types/Book.types'
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
    <div className='flex flex-col md:flex-row gap-4 xl:gap-4 p-4 md:p-6'>
      <div className='w-full min-h-20 md:w-[340px] md:h-[340px] xl:w-[486px] xl:h-[486px] rounded-xl md:rounded-2xl bg-slate-300'>
        이미지
      </div>
      <div className='flex-grow'>
        <div className='pb-4 border-solid border-b-2 border-gray-800 mb-6'>
          <h1 className='text-2xl mb-4 font-semibold'>{book.title}</h1>
          <h2 className='text-4xl font-semibold'>{book.author}</h2>
        </div>
        <div>
          <div className='mb-2'>
            <h3 className='font-semibold'>책 소개</h3>
            <p>{book.summary}</p>
          </div>
          <div className='mb-2'>
            <h3 className='font-semibold'>장르</h3>
            <p>{book.genre}</p>
          </div>
          <div>
            <h3 className='font-semibold'>발행일</h3>
            <p>{book.publishedDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
