/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:8000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

const ProductDetails = ({ productId  }) => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", productId ],
    queryFn: retrieveProduct,
  });

  if (isLoading) return <div>Fetching product Details</div>;
  if (error) return <div>An Error Occured {error.message}</div>;
  return (
    <div className="w-1/5">
      <h1 className="text-3xl my-2">Product Details</h1>
      <div className="border bg-gray-100 p-1 text-md rounded flex flex-col space-x-2">
        <img className="object-cover h-40 w-40 border rounded-full m-auto" src={product.thumbnail} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>USD: {product.price}</p>
        <p>{product.rating}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
