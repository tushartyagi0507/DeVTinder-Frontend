import { Link, useNavigate } from "react-router-dom";
import swipe from "../assets/swipe.gif";
import { useState } from "react";
import axios from "axios";
import { addUser } from "../Utils/userSlice";
import toast from "react-hot-toast";

const Signup = () => {
  // First, modify the fieldInput constant at the top of the file
  const fieldInput = "flex flex-row items-center gap-5 ";
  const { labelText } = "font-bol text-lg";
  const Navigate = useNavigate();

  const userData = {
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    age: "",
    photoUrl: "",
    gender: "",
    about: "",
  };

  const [user, setuser] = useState(userData);
  const [error, seterror] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setuser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    if (typeof user.age === "string") {
      setuser((prev) => ({ ...prev, age: Number(user.age) }));
    }

    try {
      seterror("");
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/signup", user, {
        withCredentials: true,
      });
      console.log(res);
      addUser(user);
      toast.success("User created successfully");
      Navigate("/feed");
    } catch (e) {
      seterror(error?.response?.data?.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="hero flex flex-col min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex pt-4">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-left">
            Match with <span className="text-blue-400">Developers</span> who
            inspire
          </h2>
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-1/2 ">
            <img src={swipe} alt="swipe.gif" />
          </div>
          <div className="card bg-gradient-to-r bg-gray-300 bg-steel-800 w-full max-w-sm shrink-0 shadow-2xl mr-4">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className={labelText}>First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="FirstName"
                  value={user.FirstName}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input input-bordered flex-1"
                  required
                />
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className={labelText}>Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="LastName"
                  value={user.LastName}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input input-bordered flex-1"
                  required
                />
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className={labelText}>Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input input-bordered flex-1"
                  required
                />
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className={labelText}>Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input input-bordered flex-1"
                  required
                />
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className="">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="age"
                  min="18"
                  max="65"
                  name="age"
                  value={user.age}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input input-bordered flex-1"
                  required
                />
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className="">Gender</span>
                </label>
                <select
                  name="gender"
                  className="bg-transparent focus:outline hover:input-bordered"
                  value={user.gender}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                  <option value="Gender">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">others</option>
                </select>
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className={labelText}>PhotoUrl</span>
                </label>
                <input
                  type="text"
                  placeholder="photoUrl"
                  name="photoUrl"
                  value={user.photoUrl}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input input-bordered flex-1"
                  required
                />
              </div>
              <div className={fieldInput}>
                <label className="label w-1/3">
                  <span className={labelText}>About</span>
                </label>
                <input
                  type="text-area"
                  name="about"
                  placeholder="Bio"
                  value={user.about}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  className="input textarea-bordered flex-1 resize"
                  required
                />
              </div>
              <Link to="/login" className="text-primary text-sm underline">
                Already a user
              </Link>
              {error && <p className="bg-red-600 text-sm">{error}</p>}
              <div className={`${fieldInput} mt-2 flex justify-center`}>
                <button className="btn btn-primary text-center">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
