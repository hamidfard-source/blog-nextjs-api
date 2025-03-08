'use client'
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <nav className="mt-6">
            <Link href="/" className="block py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              Posts
            </Link>
            <Link href="/allusers" className="block py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              User managment
            </Link>
            <Link href="/" className="block py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;