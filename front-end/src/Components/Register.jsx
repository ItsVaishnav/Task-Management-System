import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { useRef } from "react";

export default function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  async function registerUser(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const mobNumber = mobNumberRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const data = { name, email, mobNumber, password, confirmPassword };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        data
      );
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-90 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        <form>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mob" className="form-label">
              Mob Number
            </label>
            <input
              type="number"
              className="form-control"
              ref={mobNumberRef}
              id="mob"
              placeholder="Enter your mobile Number"
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
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            onClick={registerUser}
          >
            Register
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
