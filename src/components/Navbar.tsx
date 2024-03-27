import Link from 'next/link'
import { Searchbar } from '@src/components'

export const Navbar = () => {
  return (
    <nav className='w-[100vw] bg-highlighter p-8 py-4 text-xl flex justify-between items-center ' >
      <h2 className="text-2xl font-bold" > <Link href={"/"} className='focus:outline-none' >BillSpliter</Link> </h2>
      <Searchbar />
      <div>
        <span>Pushpendra Pal</span>
      </div>
    </nav>
  )
}

