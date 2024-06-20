import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0A1929]">
      <div className="relative w-full max-w-md rounded-lg bg-[#10263d] p-6">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <p className="text-white">
              Enter your email and password to access your account.
            </p>
          </div>
          <form className="space-y-4">
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
                <div className="text-sm font-medium text-blue-500 hover:underline cursor-pointer">
                  Forgot password?
                </div>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
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
            <button
              type="submit"
              className="w-full rounded bg-black py-2 text-white"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-white">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="font-medium text-blue-500 underline ml-1"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
