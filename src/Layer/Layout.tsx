// Layout.js
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = () => {
  return (
    <div>
      <header>
        {/* Header content */}
        <h1>Header content</h1>
      </header>
      <main>
        {/* Main content */}
        {<Outlet />}
      </main>
      <footer>
        {/* Footer content */}
        <p>&copy; 2024 inventory management</p>
      </footer>
    </div>
  );
};

export default Layout;
