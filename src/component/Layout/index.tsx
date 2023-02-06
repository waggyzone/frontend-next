import Header from "../Header";

const Layout: React.FC<{ className?: string; children?: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className={`${className} layout`}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
