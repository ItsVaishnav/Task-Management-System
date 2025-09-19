import { Navigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { userData } = useAuthContext();

  if (!userData) {
    // not logged in
    return <Navigate to="/login" />;
  }

  // Ensure roles from API (array) are matched
  const hasRole = userData.roles?.some((role) => roles.includes(role));

  if (!hasRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
