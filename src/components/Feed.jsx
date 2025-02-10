import { useEffect } from "react";

import axios from "axios";
import { URL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import UserCard from "./UserCard";

export const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchUsers = async () => {
    if (feed) return;
    try {
      const response = await axios.get(URL + "user/feed", {
        withCredentials: true,
      });
      console.log(response?.data?.data);
      dispatch(addFeed(response?.data?.data));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
