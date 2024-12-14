'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteBook } from '@/services/bookServices'
import { useRouter } from 'next/navigation'

export const DeleteBookButton = ({ id }: { id: string }) => {
  const router = useRouter()
  const onDelete = async () => {
    try {
      const data = await deleteBook(id)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md'>
        삭제
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제를 원하시나요?</AlertDialogTitle>
          <AlertDialogDescription>
            한 번 삭제한 책 데이터는 다시는 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
