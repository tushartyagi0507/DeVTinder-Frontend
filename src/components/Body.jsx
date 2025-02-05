import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Body = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        {" "}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
