import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import UserMenu from "@/components/UserMenu";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      {/* flex: enables flexbox
          items-center: aligns items vertically in the center
          justify-between: pushes PrepWise to the left and UserMenu to the right
          w-full: ensures the nav takes up the whole width
      */}
      <nav className="flex items-center justify-between w-full px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100 font-bold text-xl">PrepWise</h2>
        </Link>

        {/* UserMenu will now stay on the extreme right */}
        {user && <UserMenu user={user} />}
      </nav>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
