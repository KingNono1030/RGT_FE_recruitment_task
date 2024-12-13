import { Router, Request, Response } from 'express'
import { Book } from '../models/book'

const BOOK_DELETE_SUCCESS_MESSAGE = '성공적으로 책을 삭제했습니다.'
const BOOK_NOT_FOUND_ERR_MESSAGE = '해당 Id의 책을 찾을 수 없습니다.'
/**
 * 공통 에러 처리 함수
 */
const handleError = (res: Response, error: unknown): void => {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message })
  } else {
    res.status(500).json({ message: '알 수 없는 서버 에러 발생' })
  }
}

const router = Router()

/**
 * @route GET /
 * @desc 모든 책 조회
 * @access Public
 */
router.get('/', async (_, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * @route GET /:id
 * @desc id 로 책 한 권 상세 조회
 * @access Public
 */
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      res.status(404).json({ message: BOOK_NOT_FOUND_ERR_MESSAGE })
      return
    }
    res.status(200).json(book)
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * @route POST /
 * @desc 책 추가
 * @access Admin
 */
router.post(
  '/',
  async (
    req: Request<{}, {}, { title: string; author: string }>,
    res: Response
  ) => {
    try {
      const book = new Book(req.body)
      const newBook = await book.save()
      res.status(201).json(newBook)
    } catch (error) {
      handleError(res, error)
    }
  }
)

/**
 * @route PUT /:id
 * @desc ID로 책 수정
 * @access Admin
 */
router.put(
  '/:id',
  async (
    req: Request<{ id: string }, {}, { title?: string; author?: string }>,
    res: Response
  ) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      if (!book) {
        res.status(404).json({ message: BOOK_NOT_FOUND_ERR_MESSAGE })
        return
      }
      res.status(200).json(book)
    } catch (error) {
      handleError(res, error)
    }
  }
)

/**
 * @route DELETE /:id
 * @desc ID로 책 삭제
 * @access Admin
 */
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
      res.status(404).json({ message: BOOK_NOT_FOUND_ERR_MESSAGE })
      return
    }
    res.status(200).json({ message: BOOK_DELETE_SUCCESS_MESSAGE })
  } catch (error) {
    handleError(res, error)
  }
})

export { router }
