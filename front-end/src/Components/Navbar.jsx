import { Link } from "react-router-dom";

export default function Navbar({ children }) {
  return (
    <div>
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
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-light text-primary">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div
          className="bg-light border-end"
          style={{ width: "200px", minHeight: "92vh" }}
        >
          <h3 className="m-3">Menu</h3>
          <ul className="nav flex-column p-3">
            
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="/">
                Manage Task
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="/Managestatus">
                Status
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="/Managepriority">
                Priority
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="/Managerole">
                Manage Role
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark" to="/Manageusers">
                Manage Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 flex-grow-1">{children}</div>
      </div>
    </div>
  );
}
