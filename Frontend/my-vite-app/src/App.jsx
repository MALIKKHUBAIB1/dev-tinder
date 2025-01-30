import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Fix import
import "./App.css";
import Body from "./component/Body";
import About from "./component/About";
import Feed from "./component/Feed";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Error from "./utils/Error";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
