export default function Navbar({ children }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25694.png" // Replace with your icon
              alt="Home"
              width="25"
              height="25"
              className="me-2"
            />
            Home
          </a>

          <div className="d-flex ms-auto">
            <a href="/login" className="btn btn-outline-light me-2">
              Login
            </a>
            <a href="/register" className="btn btn-light text-primary">
              Register
            </a>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div
          className="bg-light border-end"
          style={{ width: "200px", minHeight: "100vh" }}
        >
          <ul className="nav flex-column p-3">
            <li className="nav-item mb-2">
              <a className="nav-link text-dark" href="/manage">
                Manage Task
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-dark" href="/status">
                Status
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-dark" href="/priority">
                Priority
              </a>
            </li>
          </ul>
        </div>
        <div className="p-4 flex-grow-1">{children}</div>
      </div>
    </div>
  );
}
