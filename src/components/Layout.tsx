import { type NextPage } from "next";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-auto bg-gray-900 pb-3 text-white">
      <div className="mx-auto w-2/3">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
