import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/api";

interface Product {
  sn: number;
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

interface Vendor {
  id: number;
  name: string;
  email: string;
  contact: string;
  contact_person: string;
  address: string;
}

const PurchaseBill: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [paidAmount, setPaidAmount] = useState<number>(0);
   const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    // Initialize with one default product row
    addProduct();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const addProduct = () => {
    const newProduct: Product = {
      sn: products.length + 1,
      name: "",
      quantity: 0,
      rate: 0,
      total: 0,
    };
    setProducts([...products, newProduct]);
  };
  // get supplier
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/get-vendors")
      .then((res) => {
        setVendors(res.data.data);
        console.log("Vendors are successfully fetched", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); 

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      [name]: value,
    };
    newProducts[index].total =
      newProducts[index].quantity * newProducts[index].rate;
    setProducts(newProducts);
  };

  const deleteProduct = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const calculateGrandTotal = () => {
    return products.reduce((acc, curr) => acc + curr.total, 0);
  };

  const calculateDue = () => {
    return calculateGrandTotal() - paidAmount;
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Saving data:", products);
    console.log("Paid amount:", paidAmount);
  };
  interface IForm {
    supplierName: string;
    date: Number;
  }
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      supplierName: "",
      date: "",
    },
  });

  return (
    <div className="md:h-[100vh] flex-col mx-auto">
      <h1 className="text-xl mt-4 ml-10">Add Purchase Bill</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Add Purchase Bill
      <div>
        <hr className="md:w-[1250px] mt-10 mx-4 bg-red-600 h-[3px]" />
      </div>
      <div className="flex ml-6 mt-3">
                    <label className="gap-8 flex mt-1 ">
                      Supplier Name:
                      <select
                        className="ml- w- py-2 w-80 rounded border border-l-amber-500"
                        {...register("supplierName")}
                      >
                         <option value="choose Option">choose option </option>
                        {vendors.map((vendor)=>(
                          <option value="Salary">{vendor.name}</option>
                        ))}
                        

                      </select>
                    </label>
                  </div>
      <div className="flex  md:gap-5 gap-10 mt-4 mb-10">
        <h1 className="md:ml-4 w-32">Date:</h1>
        <Input
          type="date"
          placeholder="date"
          className="md:w-80"
          {...register("date")}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{product.sn}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    name="rate"
                    value={product.rate}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">{product.total}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mb-4"
          onClick={addProduct}
        >
          Add Item
        </Button>
        <div className="mr-8">
          <p>Grand Total: {calculateGrandTotal()}</p>
          <p>
            Paid Amount:
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(parseInt(e.target.value))}
              className="ml-2"
            />
          </p>
          <p>Due: {calculateDue()}</p>
        </div>
      </div>
      <Button
        className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded mt-4"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default PurchaseBill;
