import { type NextPage } from "next";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-white">
      <div className="mx-auto w-2/3">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
