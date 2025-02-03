import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
