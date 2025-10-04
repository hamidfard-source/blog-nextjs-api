import React from 'react'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface selectProps {
    children?:React.ReactNode;
    label?: string ;
    placeholder?: string
    ariaLabel?: string
}
export default function SelectContain({children, label = 'select',placeholder='select',ariaLabel=''}:selectProps) {
    return (
        <Select.Root>
            <Select.Trigger
                className="rounded-md dark:bg-slate-700 dark:text-violet-300 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 "
                aria-label={ariaLabel}

            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="dark:text-violet-300 text-violet11">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md dark:bg-slate-700 bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                    <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white dark:bg-slate-700 text-violet11">
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport >
                        <Select.Group >
                            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11 dark:text-mauve8">
                                {label}
                            </Select.Label>
                         
                            {children}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center dark:bg-slate-700 bg-white text-violet11">
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>

    )
}
SelectContain.displayName = "Select"


interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
    children: React.ReactNode;
    className?: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={cn(
                    "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 dark:text-violet-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-violet11 dark:data-[highlighted]:text-violet2 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none capitalize",
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        );
    },
)