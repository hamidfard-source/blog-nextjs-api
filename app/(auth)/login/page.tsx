'use client';


import { login } from "@/app/api/auth";
import { FormState } from "@/app/api/signupFormSchema";
import { Metadata } from "next";
import { useActionState } from "react";

const metadata : Metadata ={
  title : 'Login Page',
}

const Page = () => {
    const  [state,action,pending] = useActionState<FormState>(login,undefined)

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center h-screen">

        <form action={action}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Username: </label>
            <input id="username" name="username" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
          </div>
          {state?.errors?.name && <p>{state.errors.name}</p>}
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password: </label>
            <input id="password" name="password" type="password" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must: </p>
              <ul>
                {state?.errors?.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            disabled={pending}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            login
          </button>
          {state?.message && <p className="text-red-500">{state.message}</p>}
        </form>
      </div>
    );
}

export default Page;
