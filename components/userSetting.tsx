'use client'

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./modal";
import { UpdateRole } from "@/app/dashboard/alluser/actions";

interface data {
    id: number;
    role: roleEnum;
    updatedAt: Date | undefined;
}

enum roleEnum {
    admin = 'admin',
    owner = 'owner',
    user = 'user',
}



const UserSetting: React.FC<data> = ({ id, role, updatedAt }) => {
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

    return (
        <>
            <button onClick={openModal} className=' hover:cursor-pointer'>
                <EllipsisHorizontalIcon className='h-8 w-8' />
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <div className="">
                    <div className=""> id {id}</div>
                    <div className={`${statusData === 200 ? 'text-emerald-400' : 'text-red-300'}`}> {statusData}</div>

                    <select value={valueRole} onChange={handleSelectChange} name="changeRole" className=' cursor-pointer text-slate-200 bg-slate-900 p-2' id={`${id}`}>
                        <option hidden >---</option>
                        <option value={roleEnum.owner}>owner</option>
                        <option value={roleEnum.admin}>admin</option>
                        <option value={roleEnum.user}>user</option>
                    </select>
                </div>
            </Modal>
        </>
    );
}

export default UserSetting;
