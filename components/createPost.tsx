'use client'
import { useActionState, useRef, useState } from "react";
import ReactQuill from "react-quill-new";

import { createPost, CreatePostState } from "@/app/dashboard/action";

import 'react-quill-new/dist/quill.snow.css';


const CreatePostForm: React.FC = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const hiddenInput = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const [state, formAction, pending] = useActionState(createPost, null )

  const handleChangeContent = (value: string) => {
    setContent(value)
    if (hiddenInput.current) {
      hiddenInput.current.value = value;
    }
  }
  if (state) {
    console.log(state);
  }

  return (
    <div className="md:max-w-full max-w-2xl  p-6 bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
      <form action={formAction}  encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 dark:bg-transparent border border-gray-700 dark:text-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">
            Content
          </label>
          <ReactQuill theme="snow" value={content} onChange={handleChangeContent} />
          <input ref={hiddenInput} type="hidden" name="content" value={content} />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium dark:text-gray-300">
            Upload Image
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            id="cover"
            name="cover"
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-950 file:text-indigo-300 hover:file:bg-indigo-100"
          />
          {
            imagePreview && (
              <div>
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )
          }
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full dark:bg-indigo-900 text-indigo-50 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;