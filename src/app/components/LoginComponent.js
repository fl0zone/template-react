import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./LoginComponent.css"; // Import your CSS file

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const authInstance = getAuth();
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      navigate("/");
    } catch (error) {
      alert("Sorry, Invalid Username or Password !");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="card card-custom mx-auto">
        <div className="card-body">
          <h2 className="mb-4 text-center text-white">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
              <input
                type="email"
                className="form-control black-text"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text text-white">We&apos;ll never share your email with anyone else.</div> {/* Corrected line */}
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control black-text"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center"> {/* Added wrapper div for center alignment */}
              <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
            </div>
          </form>
          <p className="mt-3 text-center">Don&apos;t have an account? <Link to="/register">Register</Link></p> {/* Corrected line */}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
