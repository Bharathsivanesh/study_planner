import React from "react";
import loginimg from "../../assets/login.jpg";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
            Welcome Back!
          </h2>

          <form>
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
              className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your password"
            />

            <div className="text-right mb-4">
              <a href="#" className="text-xs text-purple-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-300"
            >
              Log in
            </button>
          </form>

          <div className="my-4 text-center text-gray-400">Or Continue With</div>

          <div className="flex space-x-4 justify-center">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google Logo"
                className="w-5"
              />
              Google
            </button>
          </div>

          <p className="text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <a href="Signup" className="text-purple-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right - Image */}
        <div className="hidden md:flex w-1/2 items-center  justify-center ">
          <img
            src={loginimg}
            alt="Login Visual"
            className="object-contain w-full h-full p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
