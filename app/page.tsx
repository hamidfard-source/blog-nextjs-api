'use client'
import { useState, useEffect, useCallback } from 'react';
import Categories from "@/components/categories";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: number;
  likes: number;
  content: string;
  categoryId: string;
  createdAt: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' }, 
    { id: 'typescript', name: 'TypeScript' }, 
    { id: 'backend', name: 'Backend' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'others', name: 'Others' }
  ]);


  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Simulate API call
      const response = await fetch('http://localhost:3000/api/posts'
        , {
          method: 'GET'
          , next: { tags: ['post-data'] }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const result = await response.json();
        const newPosts: Post[] = result.data
        console.log(newPosts);
        
        setPosts(prev => [...prev, ...newPosts]);
        setHasMore(newPosts.length > 0);
        setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  return (
    <div className=" p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-1 md:grid-cols-5 grid-rows-5 gap-4 min-h-screen  p-4 ">
        <Categories />
        <section className="md:col-span-3 row-span-5 border border-red-500">
          <div className="h-full">

          </div>
        </section>
      </main>
    </div>
  );
}
