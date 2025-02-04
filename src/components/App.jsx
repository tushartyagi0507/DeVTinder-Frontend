import { Body } from "./Body";
import { Feed } from "./Feed";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Connections from "./Connections";
import Requests from "./Requests";
import Signup from "./Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/connections" element={<Connections />}></Route>
            <Route path="/requests" element={<Requests />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
