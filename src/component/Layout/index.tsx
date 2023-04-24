import { useSession } from "next-auth/react";
import Header from "../Header";
import Footer from "../Footer";
import { Router, useRouter } from "next/router";

const Layout: React.FC<{ className?: string; children?: React.ReactNode; role?: string }> = ({
  className,
  children,
  role,
}) => {
  // const { data } = useSession();
  const { asPath, isReady } = useRouter();
  return (
    <main className={`${className} layout scroll-x-hidden h-screen`}>
      {!asPath.includes("admin") ? <Header /> : null}
      {children}
    </main>
  );
};

export default Layout;
