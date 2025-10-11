import Sidebar from "@/components/sideBar";
import { verifySession } from "../api/dal";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  if (!session) redirect('/login');

  return (
    <main className="flex flex-row items-stretch justify-center min-h-[calc(100dvh-4rem)]">
      <Sidebar />

      <section className="lg:max-w-5xl xl:max-w-5xl 2xl:max-w-6xl">
        {children}
      </section>
    </main>
  )
}