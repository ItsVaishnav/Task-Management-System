import { Link, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

export default function Navbar() {
  const { userData } = useAuthContext();

  // Extract role safely
  let role = "guest"; // default
  if (userData?.roles && userData.roles.length > 0) {
    role = userData.roles[0]; // take the first role
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              alt="Home"
              width="25"
              height="25"
              className="me-2"
            />
            Home
          </Link>

          <div className="d-flex ms-auto">
            {!userData && (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-light text-primary">
                  Register
                </Link>
              </>
            )}
            {
              <>
                <Link to="/logout" className="btn btn-light text-primary">
                  Logout
                </Link>
              </>
            }
          </div>
        </div>
      </nav>

      {/* Body: Sidebar + Page Content */}
      <div className="d-flex flex-grow-1">
        {userData && (
          <div
            className="bg-light border-end"
            style={{ width: "200px", minHeight: "100%" }}
          >
            <h3 className="m-3">Menu</h3>

            {role === "superadmin" && (
              <ul className="nav flex-column p-3">
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/">
                    Manage Task
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/managestatus">
                    Status
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/managepriority">
                    Priority
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/managerole">
                    Manage Role
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/manageusers">
                    Manage Users
                  </Link>
                </li>
              </ul>
            )}

            {role === "admin" && (
              <ul className="nav flex-column p-3">
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/">
                    Manage Task
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/managestatus">
                    Status
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/managepriority">
                    Priority
                  </Link>
                </li>
              </ul>
            )}

            {role === "user" && (
              <ul className="nav flex-column p-3">
                <li className="nav-item mb-2">
                  <Link className="nav-link text-dark" to="/">
                    Manage Task
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Routed Page Content */}
        <div className="p-4 flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
