import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../Utils/Constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Utils/userSlice";

export const Navbar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    await axios.get(URL + "logout", { withCredentials: true });
    dispatch(removeUser());
    Navigate("/login");
  };

  return (
    <div>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevHinge
          </Link>
        </div>
        {user && (
          <div className="flex-none px-6">
            <p className="px-2">Welcome {user.FirstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
