const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-full h-[80vh]">
      {children}
    </div>
  );
};

export default Layout;
