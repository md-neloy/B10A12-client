import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../Sharecomponent/ErrorPage";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/signIn/SignIn";
import Register from "../Pages/register/Register";
import AllClasses from "../Pages/AllClasses/AllClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allclasses",
        element: <AllClasses />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
