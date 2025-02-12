import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { getData } from "../Data";
import Loader from "../components/Layout/Loader";

const Details = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { product, setProduct } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getData(`/getAllProducts?_id=${id}`);
        if (response === null) return window.alert("No Product Found");
        console.log(response);
        setProduct(response?.product[0]);
      } catch (error) {
        return window.alert(error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gray-100 pt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img
                      className="w-full h-full object-cover"
                      src={product?.imageUrl}
                      alt="Product Image"
                    />
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {product?.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {product?.description}
                  </p>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 mr-1">
                        Price:
                      </span>
                      <span className="text-gray-600">${product?.price}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 mr-1">
                        Availability:
                      </span>
                      <span className="text-gray-600">
                        {product?.inStock > 0 ? "In Stock" : "Out Of Stock"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">
                      Product Description:
                    </span>
                    <p className="text-gray-600 text-sm mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed sed ante justo. Integer euismod libero id mauris
                      malesuada tincidunt. Vivamus commodo nulla ut lorem
                      rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et
                      venenatis sem blandit. Quisque ut erat vitae nisi ultrices
                      placerat non eget velit. Integer ornare mi sed ipsum
                      lacinia, non sagittis mauris blandit. Morbi fermentum
                      libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                  </div>
                  <div className="w-1/2 mt-5">
                    <button
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-500 disabled:bg-gray-400"
                      disabled={product?.inStock > 0 ? false : true}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
