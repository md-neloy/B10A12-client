import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../Sharecomponent/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      //   {
      //     path: "/",
      //     element: <Navbar />,
      //   },
    ],
  },
]);

export default router;
