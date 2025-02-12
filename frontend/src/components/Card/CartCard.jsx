import React from "react";

const CartCard = ({ data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left font-semibold">Product</th>
          <th className="text-left font-semibold">Price</th>
          <th className="text-left font-semibold">Quantity</th>
          <th className="text-left font-semibold">Total</th>
        </tr>
      </thead>
      <tbody>
        {data && data?.length > 0 ? (
          data?.map((item) => (
            <tr key={item?._id}>
              <td className="py-4">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 mr-4"
                    src={item?.productId?.imageUrl}
                    alt="Product image"
                  />
                  <span className="font-semibold">{item?.productId?.name}</span>
                </div>
              </td>
              <td className="py-4">${item?.productId?.price}</td>
              <td className="py-4">
                <div className="flex items-center">
                  {/* <button className="border rounded-md py-2 px-4 mr-2">
                    -
                  </button> */}
                  <span className="text-center w-8">{item?.quantity}</span>
                  {/* <button className="border rounded-md py-2 px-4 ml-2">
                    +
                  </button> */}
                </div>
              </td>
              <td className="py-4">${item?.productId?.price}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="py-4" colSpan={4}>
              <p className="text-center">No Items Found.</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CartCard;
