import Sidebar from "@/components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  )
}