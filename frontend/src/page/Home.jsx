import React, { useEffect, useState } from "react";
import { getData } from "../Data";
import ProductCard from "../components/Card/ProductCard";
import { useAppContext } from "../Context/AppContext";
import Loader from "../components/Layout/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { products, setProducts } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getData("/getAllProducts");
        if (response === null) return window.alert("No Product Found");
        console.log(response);
        setProducts(response?.product);
      } catch (error) {
        return window.alert(error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {/* showing loader when data is loading  */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="font-bold text-xl mb-3">All Products</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 px-2 lg:px-0">
            {products &&
              products?.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
