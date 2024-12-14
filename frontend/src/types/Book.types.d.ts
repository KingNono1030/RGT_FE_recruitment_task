export type BookBase = {
  title: string
  author: string
  publishedDate: string
  genre: string
  summary?: string
}

export interface BookListItem extends BookBase {
  _id: string
}

export type CreateBookRequest = BookBase
export type UpdateBookRequest = BookBase
