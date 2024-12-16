'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format, isDate } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { updateBook } from '@/services/bookServices'
import { useRouter } from 'next/navigation'
import { BookListItem } from '@/types/Book.types'

export const addBookSchema = z.object({
  title: z.string().min(1, '책 제목을 입력해주세요'),
  author: z.string().min(1, '저자를 입력해주세요'),
  publishedDate: z.date().refine((date) => isDate(date), {
    message: 'Date 형태의 값을 입력해야 합니다.',
  }),
  genre: z.string().min(1, '장르를 입력해야 합니다.'),
  summary: z.string().optional(),
})

export const EditBookForm = ({
  initialValues,
}: {
  initialValues: BookListItem
}) => {
  const publishedDate = new Date(initialValues.publishedDate)
  const router = useRouter()
  const form = useForm<z.infer<typeof addBookSchema>>({
    resolver: zodResolver(addBookSchema),
    defaultValues: { ...initialValues, publishedDate },
  })

  const onSubmit = async (values: z.infer<typeof addBookSchema>) => {
    const publishedDateStr = values.publishedDate.toString()
    try {
      const data = await updateBook(initialValues._id, {
        ...values,
        publishedDate: publishedDateStr,
      })
      const id = data['_id']
      router.push(`/books/${id}`)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>책 제목</FormLabel>
              <FormControl>
                <Input placeholder='책 제목' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='author'
          render={({ field }) => (
            <FormItem>
              <FormLabel>저자</FormLabel>
              <FormControl>
                <Input placeholder='저자' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='publishedDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>발행일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>날짜를 선택해주세요</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='genre'
          render={({ field }) => (
            <FormItem>
              <FormLabel>장르</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='책의 장르를 선택해주세요' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='소설'>소설</SelectItem>
                  <SelectItem value='시'>시</SelectItem>
                  <SelectItem value='희곡'>희곡</SelectItem>
                  <SelectItem value='시나리오'>시나리오</SelectItem>
                  <SelectItem value='에세이'>에세이</SelectItem>
                  <SelectItem value='논픽션'>논픽션</SelectItem>
                  <SelectItem value='자서전'>자서전</SelectItem>
                  <SelectItem value='비평'>비평</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>줄거리 요약</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='책의 줄거리를 요약해 적어주세요'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>저장</Button>
      </form>
    </Form>
  )
}
