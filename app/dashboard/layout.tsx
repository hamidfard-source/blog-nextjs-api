import Sidebar from "@/components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="grid place-items-stretch max-w-[calc(100%-16rem)] ml-auto">{children}</main>
    </>
  )
}