"use server"

import { categoryType } from '@/app/db/schema';
import { DeleteAlertDialog } from '../ui/alertDialog';
import { formatDate } from '@/lib/utils';

const CategoriesTable = ({ data }: { data: categoryType[] }) => {

  // Column definitions
  const columns = [
    { key: 'id', label: '' },
    { key: 'name', label: 'Category Name' },
    { key: 'createdAt', label: 'Created At', format: (date:string)=>formatDate(date)},
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item: any) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                >
                  {column.format ? column.format(item[column.key]) : item[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <DeleteAlertDialog buttonText='Delete Category'/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;