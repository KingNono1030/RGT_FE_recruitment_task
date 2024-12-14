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
      <h1>책 편집</h1>
      <EditBookForm initialValues={book} />
    </div>
  )
}
