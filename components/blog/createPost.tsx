'use client'
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { UploadButton } from "@/utils/uploadthing";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import useToast from '@/hooks/useToast'

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import "./quill-cutom.css";


interface PostFormData {
  title: string;
  content: string;
  cover: File | null;
}

type result = {
  success?: any
  error?: any
}

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  content: z.string().min(1, "Content is Required"),
  cover: z.string().min(1, "Cover is Required"),
})

const CreatePostForm: React.FC = () => {
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast, toastPromise } = useToast()
  const router = useRouter()
  const quillRef = useRef<HTMLDivElement | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );



  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      cover: "",
    }
  })
  const onBlogSubmit = async (data: any) => {
    console.log(data);
    const fetchData = async () => {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }
      
      return response.json();
    }
    try {
      const result =await toastPromise(fetchData(), {
        pending: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data',
      })

      if ('success' in fetchData && fetchData.success) {
        showToast('upload was successfull', 'success')
        router.push('/');

      } else if ('error' in fetchData) {
        showToast('Unsuccessful fetching', 'error');
      }
    } catch (error) {
      showToast(`ERROR: ${error}`, 'error');
    }
  }

  const title = watch("title");
  const content = watch("content");
  const cover = watch("cover");
  return (
    <div className="md:max-w-full max-w-2xl  p-6 dark:bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
      <form onSubmit={handleSubmit(onBlogSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium dark:text-gray-300">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 block w-full px-3 py-2 dark:bg-transparent border border-gray-700 dark:text-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                
              />
            )}
          />

        </div>
        {errors.title && (
          <p className="text-sm text-red-600 mt-2">{errors.title.message}</p>
        )}

        <div className="mb-4 ">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                className={cn('quill-editor *:bg-transparent')}
                modules={modules}
                {...field}
                onChange={(content) => field.onChange(content)}
                placeholder="Write your Story"
              />
            )}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium dark:text-gray-300">
            Upload Image
          </label>
          <div >
            <UploadButton
              endpoint="imageUploader"
              appearance={{
                button: "data-[state=ready]:bg-slate-700 data-[state=readying]:bg-slate-800 date-[state=disabled]:bg-slate-500 data-[state=uploading]:bg-slate-400 data-[state=uploading]:opacity-50"
              }}
              config={{ cn: cn }}
              onClientUploadComplete={(res: any) => {
                console.log("Files: ", res)
                if (res && res[0]) {
                  setValue("cover", res[0].url);
                }
                console.log("Upload complete!");
              }}
            />
          </div>
        </div>

        <Button
          type="submit"
          className=""
        >
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePostForm;