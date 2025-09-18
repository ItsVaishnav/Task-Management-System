import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-90 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-danger rounded-circle">
            <FaGoogle />
          </button>
          <button className="btn btn-outline-primary rounded-circle">
            <FaFacebook />
          </button>
          <button className="btn btn-outline-info rounded-circle">
            <FaLinkedin />
          </button>
        </div>
      </div>
    </div>
  );
}
