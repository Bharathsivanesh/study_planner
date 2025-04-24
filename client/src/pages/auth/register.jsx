import React from "react";
import signupImg from "../../assets/auth/login.jpg";
import AuthButton from "../../components/authbutton/authbtn.jsx";

const Signup = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Left - Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
            Create Your Account
          </h2>

          <form>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Full Name
            </label>
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your full name"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your email"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Password
            </label>
            <input
              type="password"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Create a password"
            />

            <AuthButton label="Sign up" />
          </form>

          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="/" className="text-purple-500 hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Right - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={signupImg}
            alt="Signup Visual"
            className="object-contain w-full h-full p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
