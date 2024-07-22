import { Navigation } from "@/components/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
