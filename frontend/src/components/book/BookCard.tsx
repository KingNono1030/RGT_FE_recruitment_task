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

export function BookCard({
  _id,
  title,
  author,
  publishedDate,
  summary,
}: BookListItem) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`저자: ${author}`}</p>
        <p className='font-bold'>{`발행일: ${publishedDate}`}</p>
        <p>{summary}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/books/${_id}`}>
          <Button className='w-full'>책 상세 보기</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
