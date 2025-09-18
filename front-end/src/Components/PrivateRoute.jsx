import { Navigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { userData } = useAuthContext();

  if (!userData) {
    // not logged in → go to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(userData.role)) {
    // logged in but role not allowed → unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
