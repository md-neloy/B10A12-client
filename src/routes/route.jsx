import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../Sharecomponent/ErrorPage";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/signIn/SignIn";
import Register from "../Pages/register/Register";
import AllClasses from "../Pages/AllClasses/AllClasses";
import PrivateRoute from "../PrivateRouts/PrivateRouts";
import TeachOn from "../Pages/TechOn/TechOn";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Details from "../Pages/Details/Details";
import Payment from "../Pages/Payment/Payment";
import StudentEnrollClass from "../Pages/Dashboard/dashboardPages/studentEnrollClass";
import Profile from "../Pages/Profile/Profile";
import AddClass from "../Pages/Dashboard/dashboardPages/AddClass";
import TeacherRoute from "../privateRouts/TeacherRoute";
import MyClass from "../Pages/Dashboard/dashboardPages/MyClass";
import AdminRoute from "../privateRouts/AdminRoute";
import Allusers from "../Pages/Dashboard/dashboardPages/Allusers";
import AllAdimClasses from "../Pages/Dashboard/dashboardPages/AllAdimClasses";
import TeacherRq from "../Pages/Dashboard/dashboardPages/TeacherRq";

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
        path: "/techon",
        element: (
          <PrivateRoute>
            <TeachOn />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // dashbaord student route
      {
        path: `enrollclass`,
        element: (
          <PrivateRoute>
            <StudentEnrollClass />
          </PrivateRoute>
        ),
      },
      // dashboard teacher route
      {
        path: "addclass",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
      },
      {
        path: "myclass",
        element: (
          <TeacherRoute>
            <MyClass />
          </TeacherRoute>
        ),
      },
      // dashboard admin route
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "allclasses",
        element: (
          <AdminRoute>
            <AllAdimClasses />
          </AdminRoute>
        ),
      },
      {
        path: "teacherRq",
        element: (
          <AdminRoute>
            <TeacherRq />
          </AdminRoute>
        ),
      },
      // dashboard common route
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
