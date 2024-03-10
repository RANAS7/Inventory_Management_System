// Layout.js
import Login from "@/components/auth/Login";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

const Layout = () => {
  return (
    <div>
      <Login/>
    </div>
  );
};

export default Layout;
