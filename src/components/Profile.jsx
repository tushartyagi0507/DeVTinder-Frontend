import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // const { theme } = useSelector((store) => store.theme)
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(user?.photoUrl);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user?.FirstName || "",
        lastName: user?.LastName || "",
        age: user?.age || "",
        photoUrl:
          user?.photoUrl ||
          "https://geographyandyou.com/images/user-profile.png",
        gender: user?.gender || "",
        about: user?.about || "",
      });
    }
  }, [user]);

  const handleInputData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    setError("");
    try {
      e.preventDefault();
      const filteredData = Object.keys(userData).reduce((acc, key) => {
        if (userData[key]) {
          acc[key] = userData[key];
        }
        return acc;
      }, {});

      const response = await axios.patch(
        `http://localhost:3000/profile/edit`,
        filteredData,
        { withCredentials: true }
      );
      if (response?.data?.error) {
        setError(response?.data?.message);
      }

      if (response?.data?.success) {
        // success toast
        dispatch(addUser(response?.data?.data));
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const files = e.target.files; // Get all selected files
    if (files.length > 0) {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("photoUrl", file); // Append each file to the FormData object
      });

      try {
        const response = await axios.post(
          `http://localhost:3000/profile/uploadProfileImg`, // Endpoint should support multiple file uploads
          formData,
          { withCredentials: true }
        );
        if (response?.data?.success) {
          toast.success("Profile images uploaded successfully!");
          setProfileImage(response?.data?.data?.photoURL);
        }
      } catch (e) {
        toast.error("Error in uploading images" + " " + e.message);
      }
    }
  };

  return (
    user && (
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="flex-1 p-6 rounded-lg shadow-lg mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form className="space-y-4" onSubmit={handleSubmitForm}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData?.firstName}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData?.lastName}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userData?.age}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={userData?.gender || ""}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option className="bg-white text-gray-800" value="Male">
                    Male
                  </option>
                  <option className="bg-white text-gray-800" value="Female">
                    Female
                  </option>
                  <option className="bg-white text-gray-800" value="Others">
                    Others
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="about"
                  rows="4"
                  name="about"
                  value={userData?.about}
                  onChange={handleInputData}
                  className="mt-1 w-full p-3 border border-gray-300 rounded bg-transparent"
                  placeholder="Write about yourself"
                ></textarea>
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 rounded text-white font-medium hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>

          <div className={`flex-1 p-6 flex justify-center items-start `}>
            <div
              className={`rounded-lg shadow-lg p-6 w-full max-w-sm text-center ${
                // theme == "dark" &&
                "bg-gradient-to-r from-gray-800 to-gray-700"
              }`}
            >
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <img
                  src={profileImage || user?.photoUrl[0]}
                  alt="User Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <div
                  className="absolute top-[10%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-500"
                  onClick={handleImageClick}
                >
                  {/* <FaCamera className="text-lg" /> */}
                </div>
              </div>
              <h3 className="text-xl font-semibold">
                {user?.FirstName} {user?.LastName}
              </h3>
              {user?.about && <p className="text-sm mb-4">{user?.about}</p>}
              <div className="text-sm space-y-2">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                {user?.gender && (
                  <p>
                    <strong>Gender:</strong> {user?.gender}
                  </p>
                )}
                {user?.age && (
                  <p>
                    <strong>Age:</strong> {user?.age}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
