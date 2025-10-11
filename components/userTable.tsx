'use client'
import { usersType } from '@/app/db/schema';
import UserSetting from './userSetting';
import { Badge } from './ui/badge';

interface TableProps {
  data: usersType[];
}

const UserTable: React.FC<TableProps> = ({ data }) => {
    console.log(data)
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto">
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
          {data.map(({ id, username, role, updateAt, createdAt }, index) => (
            <tr key={index} className="">
              <td className='py-2 px-4 border-b'> {index + 1}</td>
              <td className="py-2 px-4 border-b font-bold">{username}</td>
              <td className="py-2 px-4 border-b">
                <Badge variant='default' className='font-robotoMono font-medium'>
                  {role}
                </Badge>
              </td>
              <td className="py-2 px-4 border-b">{new Date(createdAt)?.toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(updateAt)?.toLocaleString() ?? '---'}</td>
              <td className="py-2 px-4 border-b">
                <UserSetting username={username} role={role} id={id} updatedAt={updateAt}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;