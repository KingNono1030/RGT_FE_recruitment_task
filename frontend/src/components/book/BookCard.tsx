import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Book } from '@/types/Book.types'

export function BookCard({ title, author, publishedDate, summary }: Book) {
  return (
    <Card className='w-64'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`저자: ${author}`}</p>
        <p className='font-bold'>{`발행일: ${publishedDate}`}</p>
        <p>{summary}</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>책 상세 보기</Button>
      </CardFooter>
    </Card>
  )
}
