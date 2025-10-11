'use client'
import clsx from 'clsx';
import { FilePlus, Menu, Newspaper, Shapes, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const pathName = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'New Post', icon: FilePlus },
    { href: '/dashboard/posts', label: 'Posts', icon: Newspaper },
    { href: '/dashboard/alluser', label: 'Users', icon: Users },
    { href: '/dashboard/categories', label: 'Categories', icon: Shapes },
  ];

  const linkBaseClass =
    'flex items-center gap-2 py-3 mx-3 px-4 rounded transition hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200';

  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 motion-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 max-w-64 bg-slate-900
          bg-white shadow-xl
          flex flex-col
          lg:translate-x-0
          transform transition-all duration-300
          ${isOpen ? '-translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
          >
        <div className="p-4">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white-smoke">Dashboard</h2>
          
          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(linkBaseClass, {
                  'dark:bg-slate-800': pathName === href,
                })}
              >
                <Icon className='inline-block align-middle' /> {label}
              </Link>
            ))}
          </nav>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;