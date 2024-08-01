import { getSession } from "@/lib/session";
import { Navigation } from "./navigation";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <div className="lg:container">
      <Navigation user={session?.user} />
      {children}
    </div>
  );
};

export default Layout;
