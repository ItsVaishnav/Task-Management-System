import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added Link and useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const mobNumber = mobNumberRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = { name, email, mobNumber, password, confirmPassword };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        data
      );
      console.log("User created:", response.data);
      toast.success("Registration Successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after registration
      }, 1500);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-90 bg-light">
      <ToastContainer position="top-center" autoClose={2000} />
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              className="form-control"
              id="fullname"
              placeholder="Enter your Name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mob" className="form-label">
              Mobile Number
            </label>
            <input
              type="number"
              className="form-control"
              ref={mobNumberRef}
              id="mob"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              className="form-control"
              id="email"
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
              ref={passwordRef}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              ref={confirmPasswordRef}
              className="form-control"
              id="repassword"
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>
        </form>

        {/* 🔹 Login Option */}
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none fw-bold">
            Login here
          </Link>
        </p>

        {/* Social login buttons */}
        <div className="d-flex justify-content-center gap-3 mt-2">
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
