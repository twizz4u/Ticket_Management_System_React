import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../component/AppFooter";
import AppNavbar from "../component/AppNavbar";

const AppSigninForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="sign-in max-h-screen bg-linear-to-br from-cyan-100 via-blue-100 to-blue-300 scrollbar-hide">
      <AppNavbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h4 className="text-2xl font-bold text-cyan-700 mb-4">
            Sign in to access your account and manage your tickets efficiently.
          </h4>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-8 mx-auto rounded-2xl shadow-xl w-full max-w-md border border-cyan-100 space-y-5"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label
              htmlFor="email"
              className="block text-cyan-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-cyan-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-cyan-700 text-sm">
              <input type="checkbox" className="mr-2 accent-cyan-500" />
              Remember me
            </label>
            <a
              href="#"
              className="text-cyan-600 hover:text-amber-500 text-sm font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Sign In
          </button>
          <div
            id="signinError"
            class="hidden mb-2 p-3 bg-red-100 text-red-700 rounded-lg"
          ></div>
          <div class="text-center mt-4">
            <span class="text-gray-600">Don't have an account?</span>
            <a href="/signup" class="text-cyan-600 hover:text-cyan-700 ml-1">
              Sign up
            </a>
          </div>
        </form>
      </div>
      <AppFooter />
    </section>
  );
};

export default AppSigninForm;
