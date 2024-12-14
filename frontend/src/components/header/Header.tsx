import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import RGTLogo from '../../../public/rgt.png'
import Image from 'next/image'

export function Header() {
  return (
    <header className='flex justify-between items-center p-4 shadow-md'>
      <Link href={'/'}>
        <h1 className='text-xl flex gap-2 font-bold items-center'>
          <Image width={50} src={RGTLogo} alt='rgt 로고' />
          서점
        </h1>
      </Link>
      <div className='space-x-4'>
        <Button>관리자 로그인</Button>
      </div>
    </header>
  )
}
