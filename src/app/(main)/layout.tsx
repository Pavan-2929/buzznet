import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "@/components/Navbar";
import Menubar from "@/components/Menubar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
          <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
            <Menubar className="sticky top-[6rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-md sm:block xl:w-64" />
            {children}
          </div>
          <Menubar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-2 sm:hidden" />
      </div>
    </SessionProvider>
  );
}
