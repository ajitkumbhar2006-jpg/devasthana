import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTopButton from "../common/ScrollToTopButton";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-lotus-pattern">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
