import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { BookListItem } from '@/types/Book.types'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export function BookCard({
  _id,
  title,
  author,
  publishedDate,
  genre,
}: BookListItem) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='font-bold'>{`저자: ${author}`}</p>
        <p className='font-bold'>{`장르: ${genre}`}</p>
        <p>{`발행일: ${formatDate(publishedDate)}`}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/books/${_id}`}>
          <Button className='w-full'>책 상세 보기</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
