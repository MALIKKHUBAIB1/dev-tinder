import { createBrowserRouter } from "react-router";
import "./App.css";
import Body from "./component/Body";
import { RouterProvider } from "react-router-dom";
import About from "./component/About";
import Feed from "./component/Feed";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        { path: "/", element: <Feed /> },
        { path: "/about", element: <About /> },
      ],
    },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
