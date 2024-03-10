import React, { useState } from "react";

interface CostPrice {
  date: string;
  price: number;
}

interface Product {
  name: string;
  costPrices: CostPrice[];
}

const ProductDetails: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [costPrices, setCostPrices] = useState<CostPrice[]>([
    { date: "", price: 0 },
  ]);
  const [newCostDate, setNewCostDate] = useState<string>("");
  const [newCostPrice, setNewCostPrice] = useState<number>(0);

  const addCostPrice = () => {
    const updatedCostPrices = [
      ...costPrices,
      { date: newCostDate, price: newCostPrice },
    ];
    setCostPrices(updatedCostPrices);
    setNewCostDate("");
    setNewCostPrice(0);
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h2>{productName}</h2>
      <div>
        <label>Product Name: </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <h3>Cost Prices:</h3>
        {costPrices.map((cost, index) => (
          <div key={index}>
            <p>Date: {cost.date}</p>
            <p>Price: {cost.price}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Add New Cost Price:</h3>
        <div>
          <label>Date: </label>
          <input
            type="text"
            value={newCostDate}
            onChange={(e) => setNewCostDate(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="text"
            value={newCostPrice}
            onChange={(e) => setNewCostPrice(parseInt(e.target.value))}
          />
        </div>
        <button onClick={addCostPrice}>Add Cost Price</button>
      </div>
    </div>
  );
};

export default ProductDetails;
