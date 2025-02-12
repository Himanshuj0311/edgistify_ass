import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { postData } from "../../Data";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  //   adding to cart
  const handleAddToCart = async (e, id) => {
    e.stopPropagation();
    if (user === null) return window.alert("Need to login first!.");
    try {
      const response = await postData(
        "/addToCart",
        {
          productId: id,
          userId: user?.user?.userId,
          quantity: 1,
        },
        user?.token
      );
      return window.alert(response?.message);
    } catch (error) {
      return window.alert(error?.message);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl hover:cursor-pointer"
      onClick={() => navigate(`/details/${data?._id}`)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-75"></div>
        <img
          src={data?.imageUrl}
          alt={data?.name}
          className="w-full h-38 lg:h-58 object-cover object-center relative z-10"
        />
        <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full z-20 transform rotate-12">
          Stock left: {data?.inStock}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-extrabold text-gray-800 mb-2 truncate w-full">
          {data?.name}
        </h2>
        <p className="text-gray-600 mb-4 truncate w-full">
          {data?.description}
        </p>
        <div className="flex items-center flex-wrap justify-between mb-4">
          <span className="text-xl lg:text-2xl font-bold text-indigo-600">
            ${data?.price}
          </span>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600 text-xs lg:text-sm">
              4.9 (120 reviews)
            </span>
          </div>
        </div>
        <button
          className="w-full bg-indigo-600 text-white font-bold py-1.5 px-2 lg:py-3 lg:px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:bg-opacity-40"
          disabled={data?.inStock === 0 ? true : false}
          onClick={(e) => handleAddToCart(e, data?._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
