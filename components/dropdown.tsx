import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const Dropdown = ({
    children, title , className , width , buttonStyle
}: {
    children: React.ReactNode,
    title ?: string ,
    className?: string,
    width?:string ,
    buttonStyle?: string,
}) => {
    return (
        <div className={`group ${width}`}>
            <button className={`${buttonStyle} `}>
                <ChevronDownIcon className="w-7 h-7 inline-block motion-preset-slide-down group-hover:hidden float-left mx-1" />
                <ChevronUpIcon className="w-7 h-7 hidden group-hover:inline-block motion-preset-slide-up-md float-left mx-1" />
                <span className=" text-wrap capitalize px-2">{title}</span>
            </button>
            <div className={`group-hover:flex hidden absolute z-20 flex-col p-2 *:p-3 group-hover:motion-preset-blur-down-md ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Dropdown;
