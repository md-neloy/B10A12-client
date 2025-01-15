import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useContexHooks from "../useHooks/useContexHooks";
import useAdmin from "./useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContexHooks();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loading || isAdminLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={location.pathname}></Navigate>;
};

export default AdminRoute;
AdminRoute.propTypes = {
  children: PropTypes.element,
};
