import { Navigation } from "@/components/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:container">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
