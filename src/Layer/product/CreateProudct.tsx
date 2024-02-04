// ProductForm.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    productName: "Apple",
    image: "Product Image show",
    costprice: "Rs. 450",
    stock: "550",
  },
];

const CreateProudct: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const handleSave = () => {
    // Here you can handle the saving logic, for example, sending the data to an API
    console.log({
      productName,
      productCost,
      productQuantity,
    });

    // Reset the form fields after saving
    setProductName("");
    setProductCost("");
    setProductQuantity("");
  };

  return (
    <div className=" mx-10 mt-8 h-screen">
      <h1 className="text-xl mt-4 ml-10">Create Product</h1>
      <a className="ml-8  text-blue-500" href="#">
        Dashboard
      </a>
      / Create Product
      <div className="flex mt-10 gap-10 w-full">
        <div className="md:flex gap-2 mb-4 items-center">
          <label
            className="inline    text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Date
          </label>
          <input
            className="shadow  appearance-none border rounded w-52 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productName"
            type="date"
            placeholder="Product Name"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
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
        <div className="md:flex mb-4 items-center">
          <label
            className="inline w-28   text-gray-700 text-sm font-bold mb-2"
            htmlFor="productCost"
          >
            Product Cost
          </label>
          <input
            className=" shadow appearance-none border rounded w-80  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productCost"
            type="text"
            placeholder="Product Cost"
            value={productCost}
            onChange={(e) => setProductCost(e.target.value)}
          />
        </div>
      </div>
      {/* product form */}
      <div className="md:flex gap-10 mt-8 mb-4 items-center">
        <div className="flex mb-4">
          <label
            className="inline w-32 mt-4  text-gray-700 text-sm font-bold mb-2"
            htmlFor="productQuantity"
          >
            Product Quantity
          </label>
          <input
            className="shadow appearance-none w-96 border rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productQuantity"
            type="text"
            placeholder="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="md:flex max-w-sm items-center gap-3">
          <Label htmlFor="picture">Picture</Label>
          <Input className="w-96 py-4" id="picture" type="file" />
        </div>
      </div>
      <div className="mt-2">
        {/* Here we can calculate the average calculation of the product */}
        <Button onClick={() => setShow(!show)}>
          {" "}
          {show === true ? "Hide calculation" : "Average Calculation"}
        </Button>
        {show && (
          <div className="gap-2 w-full mt-10">
            <div className="flex gap-10 w-full">
              <div className="md:flex gap-2 mb-4 items-center">
                <label
                  className="inline    text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productName"
                >
                  Date
                </label>
                <input
                  className="shadow  appearance-none border rounded w-52 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productName"
                  type="date"
                  placeholder="Product Name"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex mb-4 ">
                <label
                  className="inline w-32 mt-4   text-gray-700 text-sm font-bold mb-2"
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
              <div className="md:flex mb-4 items-center">
                <label
                  className="inline w-32   text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productCost"
                >
                  New Product Cost
                </label>
                <input
                  className=" shadow appearance-none border rounded w-80  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productCost"
                  type="text"
                  placeholder="Product Cost"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
              </div>
            </div>
            <hr className="w-[95%] h-[2px] mt-10 ml-10 bg-blue-600" />
            {/* Here Average Price table will Show */}
            <div className="w-[100%] mt-10">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="text-center">
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>AVG Cost Price</TableHead>
                    <TableHead>Total Qnty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.image}>
                      <TableCell className="font-medium">
                        {invoice.image}
                      </TableCell>
                      <TableCell>{invoice.productName}</TableCell>
                      <TableCell>{invoice.costprice}</TableCell>
                      <TableCell>{invoice.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end ">
        <button
          className=" bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateProudct;
