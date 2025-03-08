'use client'
import { usersType } from '@/app/db/schema';
import UserSetting from './userSetting';

interface TableProps {
  data: usersType[];
}

const UserTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div>

      </div>
      <table className="table-fixed ">
        <thead className=''>
          <tr className='font-thin'>
            <th className="py-2 px-4 border-b"> </th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b"> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="">
              <td className='py-2 px-4 border-b'> {index + 1}</td>
              <td className="py-2 px-4 border-b">{item.username}</td>
              <td className="py-2 px-4 border-b"><div className='font-mono text-sm bg-opacity-40 bg-red-700 text-slate-200 px-2 rounded-lg'>{item.role}</div></td>
              <td className="py-2 px-4 border-b">{item.createdAt.toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{item.updateAt?.toLocaleString() ?? '---'}</td>
              <td className="py-2 px-4 border-b">
                <UserSetting role={item.role } id={item.id} updatedAt={item.updateAt}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;