import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList setSelectedProductId={setSelectedProductId} />
      {selectedProductId ? (
        <ProductDetails productId={selectedProductId} />
      ) : (
        <div className="mt-2 text-3xl">No product selected</div>
      )}
    </div>
  );
}

export default App;
