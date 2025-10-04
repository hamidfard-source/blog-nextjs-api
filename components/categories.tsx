import Link from 'next/link'

export default function Categories() {
  return (
    <aside className="md:row-span-5">
      <div className="flex flex-row md:flex-col flex-wrap gap-2 md:gap-0 capitalize sticky top-4">
        <Link
          href="/blog/t/javascript"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #javascript
        </Link>
        <Link
          href="/blog/t/packages"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #packages
        </Link>
        <Link
          href="/blog/t/react"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #react
        </Link>
        <Link
          href="/blog/t/typescript"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #typescript
        </Link>
        <Link
          href="/blog/t/algorithms"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #algorithms
        </Link>
        <Link
          href="/blog/t/backend"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #backend
        </Link>
        <Link
          href="/blog/t/others"
          className="hover:text-blue-400 transition-colors p-2 text-slate-800 dark:text-slate-100"
        >
          #others
        </Link>
      </div>
    </aside>
  )
}
