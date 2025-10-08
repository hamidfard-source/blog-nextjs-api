import Sidebar from "@/components/sideBar";
import { verifySession } from "../api/dal";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  if (!session) redirect('/login');

  return (
    <main className="flex flex-row min-h-[calc(100dvh-4rem)]">
      <Sidebar />

      <section className="flex-1 border-blue-400 border border-dotted">
        {children}
      </section>
    </main>
  )
}