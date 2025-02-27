import axios from "axios";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ShimmerCard from "./ShimmerCard";
import { addRequests, removeRequest } from "../Utils/requestsSlice";

const Requests = () => {
  const request = useSelector((store) => store.request, shallowEqual);
  // const { theme } = useSelector((store) => store.theme);s
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);

  const fetchrequests = async () => {
    // if (request) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/user/requests/received",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(response.data.data));
      setshow(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchrequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!request || request == null || request.length == 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="primary  text-3xl mt-4 font-bold">No request found</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col items-center space-y-7 p-4 mt-5">
        {show ? (
          request && (
            <div className="flex flex-wrap justify-center space-y-7 rounded-r-lg">
              {request &&
                request.map((info) => (
                  <div
                    key={info?._id}
                    className={`relative w-full sm:w-[520px] p-6 rounded-l-full rounded-r-lg shadow-lg flex items-center space-x-4 sm:max-w-md`}
                  >
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-200 rounded-full shadow-inner-md overflow-hidden">
                      <img
                        src={info?.fromUserId?.photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 pl-16">
                      <h2 className="text-lg font-bold">
                        {info?.fromUserId?.FirstName}{" "}
                        {info?.fromUserId?.LastName}
                      </h2>
                      {/* <p className="text-gray-400 text-sm">{info?.fromUserId.bio}</p> */}
                    </div>

                    <button
                      onClick={() => handleReviewRequest("accepted", info?._id)}
                      className="px-4 py-1 bg-base-content rounded-full text-gray-800 hover:shadow-[inset_6px_6px_10px_#babecc,inset_-6px_-6px_10px_#ffffff] transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReviewRequest("rejectee", info?._id)}
                      className="px-4 py-1 bg-base-content rounded-full text-gray-800 hover:shadow-[inset_6px_6px_10px_#babecc,inset_-6px_-6px_10px_#ffffff] transition"
                    >
                      Reject
                    </button>
                  </div>
                ))}
            </div>
          )
        ) : (
          <ShimmerCard />
        )}
      </div>
    </div>
  );
};

export default Requests;
