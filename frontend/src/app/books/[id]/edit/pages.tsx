interface BookDetailPageProps {
  params: {
    id: string
  }
}

export default async function EditBookPage({ params }: BookDetailPageProps) {
  const { id } = await params

  return (
    <div>
      <h1>책 상세</h1>
      <p>Book ID: {id}</p>
    </div>
  )
}
