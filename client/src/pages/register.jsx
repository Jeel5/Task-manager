import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3100/register", {
        username,
        password,
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0A1929]">
      <div className="relative w-full max-w-md rounded-lg bg-[#10263d] p-6">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Register</h1>
            <p className="text-white">
              Enter your username and password to create your account.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className="w-full pl-10 rounded border border-gray-300 bg-transparent px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 rounded border border-gray-300 bg-transparent px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                  aria-label="Toggle password visibility"
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-white">
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                className="w-full rounded border border-gray-300 bg-transparent px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <button type="submit" className="w-full rounded bg-black py-2 text-white">
              Sign up
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-white">
            Already have an account?
            <a href="/login" className="font-medium text-blue-500 underline ml-1">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;