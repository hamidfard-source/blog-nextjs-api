import { decrypt, deleteSession } from "@/app/api/session";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Dropdown from "./dropdown";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import { ThemeToggle } from "./themeToggle";

const Navbar = async () => {

  const cookie = await cookies();
  const session = cookie.get('session')?.value;
  const value = await decrypt(session)
  //value.userId: hamidreza
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">MyApp</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle/>
            <div className=" ">
              {session ? <>
                <Dropdown
                  title="setting"
                  className='border-dashed border bg-slate-950'
                  buttonStyle='text-slate-50 w-[8.5rem] rounded p-2 '
                  width=''
                >
                  <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm  hover:bg-blue-700">
                    <ComputerDesktopIcon className="h-5 w-5 dark:text-gray-300 inline-block mx-1" />
                    <span className="">dashboard</span>
                  </Link>
                  <button className="p-2 rounded-md hover:bg-red-700" onClick={async () => {
                    'use server'
                    await deleteSession();
                    redirect('/login')
                  }} >Logout</button>
                </Dropdown >
              </> : <>
                  <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Sign Up</Link>
              </>}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
