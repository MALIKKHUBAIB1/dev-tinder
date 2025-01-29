import { createBrowserRouter } from "react-router";
import "./App.css";
import Body from "./component/Body";
import { RouterProvider } from "react-router-dom";
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
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
    { path: "/about", element: <About /> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
