import React, { useState } from "react";
import { postData } from "../Data";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);

  //   checkout
  const handleCheckout = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user?.userId;
    const token = user?.token;
    if (!userId && !token) return window.alert("Unable to checkout!");
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    data = { ...data, userId };
    try {
      setLoading(true);
      const response = await postData("/createOrder", data, token);
      window.alert("Order place successfully.");
      if (response?.data) {
        return navigate("/");
      }
    } catch (error) {
      return window.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-md border">
          <h1 className="text-2xl font-bold text-gray-800  mb-4">Checkout</h1>
          <form onSubmit={handleCheckout}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700  mb-2">
                Shipping Address
              </h2>
              <div className="mt-4">
                <label htmlFor="fullName" className="block text-gray-700  mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={user?.user?.name}
                  className="w-full rounded-lg border py-2 px-3 disabled:bg-gray-200 disabled:bg-opacity-40"
                  name="fullName"
                  disabled
                />
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-gray-700  mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full rounded-lg border py-2 px-3 "
                  name="shippingAddress"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="city" className="block text-gray-700  mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full rounded-lg border py-2 px-3 "
                  name="city"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="state" className="block text-gray-700  mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full rounded-lg border py-2 px-3 "
                    name="state"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-gray-700  mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    className="w-full rounded-lg border py-2 px-3 "
                    name="pincode"
                  />
                </div>
              </div>
            </div>

            <div></div>

            <div className="mt-8 flex justify-end">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
                disabled={loading}
                type="submit"
              >
                {loading ? "creating order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
