import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShimmerCard from "./ShimmerCard";
import { addConnections } from "../Utils/connectionsSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connections);
  const [loading, setloading] = useState(true);
  // const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    // if (connection) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/user/connections",
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.message);
      // if (response?.data?.message == "No connection found") {
      //   setnoconnection(true);
      //   return;
      // }
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ShimmerCard />
      </div>
    );
  }

  if (!connection) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="primary  text-3xl mt-4 font-bold">
          No connection found
        </h1>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-center text-3xl text-primary text-bold">
        Connections
      </h1>
      <div className="flex flex-col items-center space-y-7 p-4 ">
        <div className="flex flex-col flex-wrap justify-center space-y-7">
          {connection &&
            connection.map((info) => {
              const { FirstName, LastName, photoUrl, about, gender } = info;
              return (
                <div
                  key={info?._id}
                  className={`w-full sm:w-[520px] rounded-2xl shadow-lg p-4 flex items-center 
                  relative`}
                >
                  {/* Image Section */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md flex-shrink-0 -ml-8">
                    <img
                      src={photoUrl || ""}
                      alt="Blog"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="ml-6 flex-1">
                    {/* Name */}
                    <p className="text-lg mb-1 font-bold">
                      {FirstName} {LastName}
                    </p>

                    {/* Gender */}
                    <h3 className="text-sm mb-2">{gender}</h3>

                    {/* Bio */}
                    <p className="text-sm mb-3 leading-relaxed">{about}</p>

                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-4 py-1.5 rounded-full hover:shadow-lg transition">
                      Message
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
