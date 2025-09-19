import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { useRef } from "react";
import useAuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { setUserData } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const data = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        data
      );

      if (!response.data) {
        return;
      }

      // Save user in context
      setUserData(response.data);

      console.log("Login Successful", response.data);

      // Redirect based on role
      const role = response.data.roles[0]?.toLowerCase();
      console.log("Role is ", role);

      if (role === "superadmin") {
        navigate("/managerole");
      } else if (role === "admin") {
        navigate("/managestatus");
      } else if (role === "user") {
        navigate("/");
      } else {
        navigate("/unauthorized"); // fallback
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-90 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
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
              ref={passwordRef}
              placeholder="Enter your password"
              required
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
