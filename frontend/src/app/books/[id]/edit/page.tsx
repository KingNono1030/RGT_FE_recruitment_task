import { EditBookForm } from '@/components/book/EditBookForm'
import { getBookById } from '@/services/bookServices'
import type { BookListItem } from '@/types/Book.types'
interface BookDetailPageProps {
  params: {
    id: string
  }
}

export default async function EditBookPage({ params }: BookDetailPageProps) {
  const { id } = await params
  const data = await getBookById(id)
  const book: BookListItem = data

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>책 편집하기</h1>
      <EditBookForm initialValues={book} />
    </div>
  )
}
