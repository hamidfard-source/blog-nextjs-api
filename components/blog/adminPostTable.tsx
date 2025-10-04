"use client"
import { useSelection } from '@/hooks/useSelection';
import React from 'react';

interface Post {
  id: number;
  title: string;
  author: number;
  likes: number;
  content: string;
  categoryId: string;
  createdAt: string;
}
const AdminPostTable: React.FC<{ data: Post[] }> = ({ data }) => {

  const {
    selectedIds,
    toggleSelection,
    toggleSelectAll,
    isSelected,
    allSelected,
    someSelected
  } = useSelection(data);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Helper function to strip HTML tags from content
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '').substring(0, 50) + '...';
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-slate-50 dark:bg-slate-900">
    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
      <thead className="bg-violet-50 dark:bg-slate-800">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            <input
              type="checkbox"
              checked={allSelected}
              ref={input => input && (input.indeterminate = someSelected)}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-700"
            />
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Author</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Likes</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Content</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Created</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
        {data.map((post) => (
          <tr 
            key={post.id} 
            className={`hover:bg-violet-50/50 dark:hover:bg-slate-700/50 transition-colors ${
              isSelected(post.id) ? 'bg-violet-100/30 dark:bg-slate-700/70' : ''
            }`}
          >
            <td className="px-4 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                checked={isSelected(post.id)}
                onChange={() => toggleSelection(post.id)}
                className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-700"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
              {post.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-100">
              {post.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
              User #{post.author}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
              {post.categoryId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {post.likes || 0}
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
              {stripHtml(post.content)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
              {formatDate(post.createdAt)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                className="text-violet-600 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-300"
                onClick={() => console.log('View post:', post.id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default AdminPostTable;