import { Link, useNavigate } from "react-router-dom";
import { postDataForLogin } from "../Data";
import { useAppContext } from "../Context/AppContext";
import { useEffect, useState } from "react";

const Login = () => {
  const { setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //   for login user
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      setLoading(true);
      const response = await postDataForLogin("/user/login", data);
      if (response === null) return window.alert("Unable to login! try again");
      setUser(response);
      //   storging the user data in localstorage
      localStorage.setItem("user", JSON.stringify(response));
      window.alert("login successfull.");
      return navigate("/");
    } catch (error) {
      return window.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  //   navigate to home if user is login
  useEffect(() => {
    if (localStorage.getItem("user")) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="relative py-3 sm:max-w-xs lg:max-w-md sm:mx-auto">
      <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <Link
              to={"/"}
              className="uppercase font-extrabold tracking-wide text-xl lg:text-2xl"
            >
              Edgistify
            </Link>
            <p className="m-0 text-[16px] font-semibold">
              Login to your Account
            </p>
            <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
              Get started with our app, just start section and enjoy experience.
            </span>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400 ">
              Email
            </label>
            <input
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              type="email"
              placeholder="johndeo@example.com"
              name="email"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400 ">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              name="password"
              placeholder="••••••••"
            />
          </div>
          <div className="mt-5">
            <button
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
              type="submit"
              disabled={loading}
            >
              {loading ? "logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="my-3">
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-500 uppercase font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
