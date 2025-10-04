"use client"
import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle, X } from "lucide-react";

import useToast from '@/hooks/useToast';
import { revalidateCategories } from "@/app/dashboard/categories/page";

const CategorieDialog: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('')
  const { toastPromise, showToast } = useToast()

  const fetchData = async (data: any) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: value })
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  }
  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      showToast('Category name cannot be empty', 'error');
      return;
    }
    try {
      await toastPromise(fetchData(), {
        pending: 'Creating category...',
        success: 'Category created successfully!',
        error: 'Failed to create category',
      });
      setOpen(false);
      setValue('');
      revalidateCategories()
    } catch (error) {
      console.error('Error client:', error);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="w-24 h-11 outline-none dark:motion-bg-out-persianBlue-600 dark:hover:motion-bg-out-persianBlue-700 dark:text-persianBlue-100 focus-visible:outline-2 focus-visible:outline-violet6 select-none font-sans rounded-md font-semiboldButton">
          <PlusCircle className="size-5 inline" /> <span className="ml-1 text-lg  font-roboto align-middle">Add</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-dark-tone/60 data-[state=open]:motion-preset-focus" />
        <Dialog.Content className="bg-white-gainsboro dark:bg-persianBlue-900 data-[state=open]:-scale-in data-[state=closed]:animate-scale-out motion-reduce:transform-none motion-reduce:transition-none fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md  p-[25px] shadow-[var(--shadow-6)] focus:outline-none ">
          <Dialog.Title className="m-0 md:text-lg font-medium text-persianblue-600 dark:text-persianGreen-200 font-roboto ">
            Add new category
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-sm leading-normal text-persianBlue-200">
            Create a new category for your articles.
          </Dialog.Description>
          <form onSubmit={SubmitHandler}>
            <fieldset className="mb-[15px] flex items-center gap-5 font-roboto">
              <label
                className="w-[90px] text-right text-[15px] text-persianBlue-100 "
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-sm px-2.5 text-[15px] leading-none bg-black dark:text-persianBlue-300 shadow-[0_0_0_1px] shadow-persianBlue-700 outline-none focus:shadow-[0_0_0_2px] focus:shadow-persianBlue-100 "
                id="name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className=" dark:bg-indigo-700 dark:text-white-smoke-900 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none outline-none outline-offset-1 focus-visible:outline-2 focus-visible:outline-indigo-500 select-none font-roboto">
                Submit
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-7 appearance-none items-center justify-center rounded-full dark:text-white-gainsboro dark:hover:text-red-5button00  dark:hover:bg-persianBlue-500/40 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none rounded-md p-1 m-2"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default CategorieDialog;
