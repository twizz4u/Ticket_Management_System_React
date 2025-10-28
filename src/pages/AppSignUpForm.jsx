import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../component/AppNavbar";
import AppFooter from "../component/AppFooter";

const AppSignUpForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === form.email);

      if (userExists) {
        setErrors((prev) => ({ ...prev, email: "Email already exists" }));
        setIsSubmitting(false);
        return;
      }

      const newUser = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <AppNavbar />
      <section className="min-h-screen bg-linear-to-b from-cyan-50/50 to-white flex items-center">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Join us Today!
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Sign up now to streamline your ticket management process and
              enhance your productivity.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
            <figure className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="signup.jpg"
                alt="Sign up illustration"
                className="w-full h-full object-cover"
              />
            </figure>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-10 rounded-xl shadow-lg flex-1 w-full max-w-xl"
            >
              <fieldset className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      type="text"
                      id="firstName"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-gray-50 ${
                        errors.firstName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                      }`}
                      placeholder="John"
                      onFocus={() =>
                        setErrors((s) => {
                          const copy = { ...s };
                          delete copy.firstName;
                          return copy;
                        })
                      }
                    />
                    {errors.firstName && (
                      <span className="text-red-600 text-sm mt-1 block">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      type="text"
                      id="lastName"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-gray-50 ${
                        errors.lastName
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                      }`}
                      placeholder="Doe"
                      onFocus={() =>
                        setErrors((s) => {
                          const copy = { ...s };
                          delete copy.lastName;
                          return copy;
                        })
                      }
                    />
                    {errors.lastName && (
                      <span className="text-red-600 text-sm mt-1 block">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
              </fieldset>

              <div className="my-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-gray-50 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                    }`}
                    placeholder="john@example.com"
                    onFocus={() =>
                      setErrors((s) => {
                        const copy = { ...s };
                        delete copy.email;
                        return copy;
                      })
                    }
                  />
                  {errors.email && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="relative">
                  <input
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 bg-gray-50 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-cyan-500 focus:ring-cyan-200"
                    }`}
                    placeholder="••••••••"
                    onFocus={() =>
                      setErrors((s) => {
                        const copy = { ...s };
                        delete copy.password;
                        return copy;
                      })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {!showPassword ? (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </>
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      )}
                    </svg>
                  </button>
                  {errors.password && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-300 relative disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className={`${isSubmitting ? "opacity-0" : ""}`}>
                  Create Account
                </span>
                {isSubmitting && (
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth={4}
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>

              <p className="mt-6 text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
      <AppFooter />
    </div>
  );
};

export default AppSignUpForm;
