"use client"
import { cn } from "@/lib/utils";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

export default ({
  itemId,
  buttonStyle,
  buttonText = "Delete",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your  account and remove your data from our servers." }: {
    itemId?: number | string,
    buttonText?: string,
    buttonStyle?: string,
    title?: string,
    description?: string,
  }) => {
    const [isOpen , setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    

    const handleAnimationEnd = ()=>{
      if(isClosing){
        setTimeout(() => {
          setIsOpen(false)
          setIsClosing(false)
        }, 400);
      }
    }

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <button className={cn("inline-flex h-[35px] items-center justify-center rounded-sm bg-persianRed-300 dark:bg-persianRed-800/50 dark:hover:bg-persianRed-800/60 dark:text-persianRed-200 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none", buttonStyle)}>
          {buttonText}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal >
        <AlertDialog.Overlay className={cn('fixed inset-0 bg-dark-tone/70 ')} />
        <AlertDialog.Content
          onAnimationEnd={handleAnimationEnd}
          className={cn(
            "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2",
            "rounded-md bg-persianBlue-50 dark:bg-persianBlue-800 p-[25px] shadow-md",
            "focus:outline-none font-roboto",
            isClosing ? "motion-translate-y-out motion-opacity-out-0 motion-duration-200/translate motion-ease-out" : "motion-preset-slide-up-sm"
          )}
        >          <AlertDialog.Title className="m-0 text-[17px] font-medium text-lg ">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-relaxed text-comet-800 dark:text-comet-400 font-normal font-vazirmatn text-sm">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[15px]">
            <AlertDialog.Cancel asChild>
              <button onClick={()=>setIsClosing(true)} className=" inline-flex h-[40px] items-center justify-center rounded-sm bg-transparent md:px-6 font-medium leading-none text-dark-tone/70 dark:text-white-gainsboro/70 outline-none outline-offset-1 hover:bg-dark-tone/30 focus-visible:outline-2 focus-visible:outline-persianBlue-500 select-none">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className=" inline-flex h-[40px] items-center justify-center rounded-sm bg-persianRed-500 dark:bg-persianRed-800 px-4 font-medium leading-none text- outline-none outline-offset-1 dark:hover:bg-persianRed-700 focus-visible:outline-2 focus-visible:outline-persianRed-700 select-none motion-fade">
                Yes, {buttonText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
