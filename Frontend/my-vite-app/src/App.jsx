import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Fix import
import "./App.css";
import Body from "./component/Body";
import About from "./component/About";
import Feed from "./component/Feed";
import Login from "./component/User/Login";
import Signup from "./component/User/Signup";
import Error from "./utils/Error";
import Profile from "./component/User/Profile";
import UserEditPrifile from "./component/User/UsereditPrifile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Feed /> },
        { path: "/about", element: <About /> }, // Keep this inside <Body />
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/edit/profile", element: <UserEditPrifile /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
