/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import axios from "axios";
import { URL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import UserCard from "./UserCard";
import ShimmerCard from "./ShimmerCard";

export const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const { shimmer, setshimmer } = useState(true);

  const fetchUsers = async () => {
    if (feed) return;
    try {
      const response = await axios.get(URL + "user/feed", {
        withCredentials: true,
      });
      if (response?.data?.data === "No user found") return;
      dispatch(addFeed(response?.data?.data));
      setshimmer(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (feed == null || !feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="primary  text-3xl mt-4 font-bold">No user found</h1>
      </div>
    );
  }

  return shimmer ? (
    <ShimmerCard />
  ) : (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
