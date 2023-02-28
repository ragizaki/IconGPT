import { type NextPage } from "next";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-auto bg-gray-900 pb-10 text-white">
      <div className="mx-auto w-2/3">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
