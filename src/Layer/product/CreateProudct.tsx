// ProductForm.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreateProudct: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(true);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setShow(!show);
  };

  const handleSave = () => {
    // Here you can handle the saving logic, for example, sending the data to an API
    console.log({
      productName,
      productCost,
      productQuantity,
      picture,
    });

    // Reset the form fields after saving
    setProductName("");
    setProductCost("");
    setProductQuantity("");
  };

  return (
    <div className=" mx-10 mt-8 md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Create Product</h1>
      <Link className="ml-8  text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Create Product
      {show && (
        <div className=" mt-10 gap-10 w-full">
          <div className="md:flex mb-4 items-center">
            <label
              className="inline w-28   text-gray-700 text-sm font-bold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-80 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="md:flex w-[100%] max-w-sm items-center gap-16">
            <Label htmlFor="picture">Picture</Label>
            <Input
              className=" py-4"
              id="picture"
              type="file"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </div>
          <Button className="mt-10 ml-36 w-28" onClick={toggleVisibility}>
            {isVisible ? "Next" : "Next"}
          </Button>
        </div>
      )}
      <div className="mt-20">
        {isVisible && (
          <div className="mt-2 gap-2 w-[85%] ml-0">
            <div className=" mt-2 gap-2 w-[85%] ml-0">
              <div className="md:flex mb-4 items-center">
                <label
                  className="inline w-28   text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productCost"
                >
                  Supplier Name
                </label>
                <select className="ml- w- py-2 w-80 rounded border border-l-amber-500">
                  <option value="apple">choose option </option>
                  <option value="apple">Ram</option>
                  <option value="banana">Hari</option>
                  <option value="orange">shyam</option>
                </select>
              </div>
              <div className="md:flex mb-4 items-center">
                <label
                  className="inline w-28   text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productCost"
                >
                  Product Cost
                </label>
                <input
                  className=" shadow appearance-none border rounded w-80 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productCost"
                  type="text"
                  placeholder="Product Cost"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
              </div>
              <div className="flex mb-4">
                <label
                  className="inline w-32 mt-4  text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productQuantity"
                >
                  Product Quantity
                </label>
                <input
                  className="shadow appearance-none w-80 border rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productQuantity"
                  type="text"
                  placeholder="Product Quantity"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="bg-green-800 w-28 mt-4 ml-32"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

export default CreateProudct;
