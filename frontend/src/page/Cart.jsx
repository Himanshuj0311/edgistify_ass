import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Data";
import CartCard from "../components/Card/CartCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(false);
  const { user, cart, setCart } = useAppContext();
  const navigate = useNavigate();

  //   get cart items
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!localStorage.getItem("user"))
          return window.alert("Login to see cart items.");
        const currentUserId = JSON.parse(localStorage.getItem("user"))?.user
          ?.userId;
        const response = await getData(`/getCart?userId=${currentUserId}`);
        if (response === null) return window.alert("No Product Found");
        // console.log(response[0]);
        setCart(response[0]);
      } catch (error) {
        return window.alert(error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //   calculate the price of cart items
  useEffect(() => {
    if (cart === null) return;
    const totalPrice = cart?.items?.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    return setTotalPrice(totalPrice);
  }, [cart]);
  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {user === null ? (
          // for empty cart
          <p className="text-center">No Item Found.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <CartCard data={(cart && cart?.items) || []} />
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice || "0.00"}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${totalPrice || "0.00"}</span>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={() => navigate(`/checkout`)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
