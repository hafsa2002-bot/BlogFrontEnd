'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from 'clsx'

export default function NavLink({href, children}) {
    const pathname = usePathname()
    const isActive = pathname === href
  return (
    <Link
        href={href}
        className={clsx(
            'flex gap-2.5 px-4 py-3 font-semibold rounded-lg cursor-pointer transition-colors',
            isActive
                ? 'bg-[#F27C3A]/10 text-[#F27C3A]'
                : 'text-stone-700 hover:bg-[#F27C3A] hover:text-white'
        )}
    >
        {children}
    </Link>
  )
}

