'use client'

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./modal";
import { DeleteUser, UpdateRole } from "@/app/dashboard/alluser/actions";
import { Button } from "./ui/button";
import { UserRoundX } from "lucide-react";
import { toast } from "react-toastify";

interface data {
    id: number;
    username:string
    role: roleEnum;
    updatedAt: Date | undefined;
}

enum roleEnum {
    admin = 'admin',
    owner = 'owner',
    user = 'user',
}

const UserSetting: React.FC<data> = ({ id, username , role, updatedAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valueRole, setValueRole] = useState<roleEnum>(role);
    const [statusData,setStatusData] = useState<number|null>(null)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValueRole(event.target.value as roleEnum);
        try {
            const { statusData:updatedStatus , data} = await UpdateRole(id, event.target.value as roleEnum);
            setStatusData(updatedStatus)
        } catch (error) {
            console.error("fetch error :", error);
        }
    }

    const handleDelete = async(id : number)=>{
        try {
            const res = await DeleteUser(id);
            if(res.statusData === 200){
                toast.success(res.data.message || "User deleted successfully")
            } else {
                toast.error(res.data.message || "Failed to delete user")
            }
        } catch {
            toast.error("Error deleting user")
        }
    }

    return (
        <>
            <button onClick={openModal} className=' hover:cursor-pointer'>
                <EllipsisHorizontalIcon className='h-8 w-8' />
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <div className="">
                    <div className="text-xl dark:text-slate-200"> Name: <span className="font-bold dark:text-white">{username}</span></div>
                    <div className={`${statusData === 200 ? 'text-emerald-400' : 'text-red-300'}`}> {statusData}</div>
                    <hr className="my-3" />
                    <select value={valueRole} onChange={handleSelectChange} name="changeRole" className='capitalize cursor-pointer text-slate-200 bg-slate-900 p-2' id={`${id}`}>
                        <option hidden >---</option>dmin

                        <option value={roleEnum.owner}>owner</option>
                        <option value={roleEnum.admin}>admin</option>
                        <option value={roleEnum.user}>user</option>
                    </select>
                    <hr className="my-3" />
                    <Button
                        onClick={()=>handleDelete(id)}
                        variant="destructive"
                        color="red"
                        size="lg"
                    >
                        <UserRoundX className="inline align-middle" /> Delete User
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default UserSetting;
