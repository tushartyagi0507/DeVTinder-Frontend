/* eslint-disable react-hooks/exhaustive-deps */
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useEffect } from "react";

export const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const isalreadyloggedIn = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (isalreadyloggedIn) return;
    try {
      const response = await axios.get(URL + "profile", {
        withCredentials: true,
      });
      console.log(response);
      dispatch(addUser(response.data.data));
    } catch (e) {
      if (e.status === 401) {
        Navigate("/login");
        return;
      }
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
