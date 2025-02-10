import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("tushar@gmail.com ");
  const [password, setPassword] = useState("Tushar@123");
  const [error, seterrror] = useState(null);

  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      dispatch(addUser(response?.data?.data));
      addUser(response?.data?.data);
      Navigate("/");
    } catch (e) {
      seterrror(e.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="bg-gray-700 p-8 rounded-lg shadow-2xl w-96">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-100">Welcome Back</h2>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="w-full px-4 py-3 rounded-lg bg-gray-600 border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-white placeholder-gray-400"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-3 rounded-lg bg-gray-600 border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-white placeholder-gray-400"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600">Error: {error}</p>}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
