import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟦 Submitting form with values:", values);

    try {
      const endpoint = isLogin
        ? "http://localhost:8080/user/login"
        : "http://localhost:8080/user/register";

      console.log("📤 Sending POST to:", endpoint);

      const res = await axios.post(endpoint, values);
      console.log("✅ Server response:", res.data);

      if (res.status === 200 || res.status === 201) {
        alert(res.data.message || "Success!");
        navigate("/ok");
      } else {
        alert(res.data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("❌ Request error:", err);
      if (err.response) {
        alert(err.response.data.error || "Server responded with an error.");
      } else if (err.request) {
        alert("No response from server. Check backend connection.");
      } else {
        alert("Request error. Check console for details.");
      }
    }
  };

  return (
    <div className="bg-blue-900 p-1 sm:p-14">
      <div className="container mx-auto text-center pb-4 bg-blue-900">
        <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-mono py-1 sm:py-2">
          Travelo
        </h1>
        <h2 className="text-white font-bold text-2xl font-mono">
          Travel the world with us
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:w-1/2 m-2 flex-grow">
          <img
            src="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/10/kris-plus-travel-hacks-singapore.jpg"
            alt="Travel"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        <div className="lg:w-1/2 bg-slate-50 m-2 px-4 sm:px-8 py-6 rounded-3xl flex-grow flex flex-col">
          <h2 className="text-2xl font-semibold flex justify-center my-2">
            {isLogin ? "Login" : "Register"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between">
            <div>
              {!isLogin && (
                <div className="mb-1 sm:mb-8">
                  <label htmlFor="name" className="m-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={values.name}
                    onChange={handleInput}
                    className="rounded-lg m-1 p-1 w-full"
                  />
                </div>
              )}

              <div className="mb-1 sm:mb-8">
                <label htmlFor="email" className="m-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  className="rounded-lg m-1 p-1 w-full"
                />
              </div>

              <div className="mb-1 sm:mb-8">
                <label htmlFor="password" className="m-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  className="rounded-lg m-1 p-1 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-400 text-white mb-4 sm:mb-6 p-2 m-2 w-full hover:bg-blue-700 transition-all"
              >
                {isLogin ? "Login" : "Register"}
              </button>

              <p className="text-sm">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 underline"
                    >
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-blue-600 underline"
                    >
                      Login here
                    </button>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
