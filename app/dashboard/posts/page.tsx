import AdminPostTable from "@/components/blog/adminPostTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SelectContain, { SelectItem } from "@/components/ui/select"

const posts = [
  {
    id: 2,
    title: "hello title",
    author: 1,
    content: "<p>Sample content</p>",
    categoryId: "JavaScript",
    createdAt: "2025-03-29T11:09:36.608Z",
    likes: 42
  },
  {
    id: 43,
    title: "FullStack Roadmap",
    author: 1,
    content: "<p>create better code for u just focus on it</p>",
    categoryId: "React",
    createdAt: "2023-02-29T11:09:36.608Z",
    likes: 43000
  },
  // More posts...
];


export default async function page() {
  const response = await fetch('http://localhost:3000/api/posts'
    , {
      method: 'GET'
      , next: { tags: ['post-data'] }
    })
  const result = await response.json()
  return (

    <main className="max-w-screen-xl border-2 border-red-500 grid place-items-center">
      <div className="flex flex-row gap-x-3 p-3">
        <SelectContain key='categories'>
          <SelectItem value="javascript">javascript</SelectItem>
          <SelectItem value="packegs">packegs</SelectItem>
          <SelectItem value="React">React</SelectItem>
          <SelectItem value="typescript">typescript</SelectItem>
          <SelectItem value="algorithms">algorithms</SelectItem>
          <SelectItem value="backend">backend</SelectItem>
          <SelectItem value="others">others</SelectItem>
        </SelectContain>
        <Input type="text" placeholder="search" className="max-w-[20rem]" />
        <Button variant="ghost" >reset</Button>
      </div>
      <div className="p-3">
        <h1>posts</h1>
        <AdminPostTable data={posts} />
      </div>
    </main>
  )
}
