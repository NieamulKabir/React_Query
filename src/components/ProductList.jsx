/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8000/${queryKey[0]}`);
  return response.data;
};

const ProductList = ({setSelectedProductId}) => {
 
  const handleSeeDetails = (productId) => {
    setSelectedProductId(productId); 
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retrieveProducts,
    refetchInterval: 1000,
  });

  if (isLoading) {
    return <div>Fetching Products...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h1 className="text-3xl my-2">Product list</h1>

      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.map((product) => (
            <li
              className="flex flex-col items-center m-2 border rounded-lg"
              key={product.id}
            >
              <img
                className="object-cover h-64 w-64 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex justify-around items-center">
                <p className="text-xl my-4">{product.title}</p>
                <button
                  onClick={() => handleSeeDetails(product.id)}
                  className="bg-gray-600 px-2 py-1 text-white ml-4 rounded-xl"
                >
                  See Details
                </button>
               
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
