/* eslint-disable react/prop-types */
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFeed } from "../Utils/feedSlice";
import { URL } from "../Utils/Constants";

const UserCard = ({ user }) => {
  const { _id, FirstName, LastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        URL + "request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(updateFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{FirstName + " " + LastName}</h2>
        <p>{age + ", " + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
