import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/api";
import { Input } from "@/components/ui/input";

interface Vendor {
  id: number;
  name: string;
  email: string;
  contact: string;
  contact_person: string;
  address: string;
}

const PurchaseBill: React.FC = () => {
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [vendors, setVendors] = useState<Vendor[]>([]);

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

  interface Product {
    productName: string;
    quantity: number;
    rate: number;
    total: number;
    image: string;
  }
  interface IForm {
    supplierName: string;
    date: string;
    product: Product[];
  }

  const createProduct = async (data: IForm) => {
    const response = await axiosInstance.post("/addProduct", data);
    return response.data;
  };

  const { register, handleSubmit, watch, control } = useForm<IForm>({
    defaultValues: {
      product: [
        {
          productName: "",
          quantity: 0,
          rate: 0,
          total: 0,
          image: "",
        },
      ],
    },
  });

  const {
    append: addProduct,
    remove: removeProduct,
    fields,
  } = useFieldArray({
    name: "product",
    control,
  });


  console.log('foem data',watch("product"))
  const onSubmit = async (data: IForm) => {
    console.log('data ,',data)
    console.log("purchase successfully");
  };

  return (
    <div className="h-[100vh] flex-col mx-auto overflow-scroll">
      <h1 className="text-xl mt-4 ml-10">Add Purchase Bill</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Add Purchase Bill
      <div>
        <hr className="md:w-[1250px] mt-10 mx-4 bg-red-600 h-[3px]" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex ml-6 mt-3">
          <label className="gap-8 flex mt-1 ">
            Supplier Name:
            <select
              className="ml- w- py-2 w-80 rounded border border-l-amber-500"
              {...register("supplierName")}
            >
              <option value="choose Option">choose option </option>
              {vendors.map((vendor) => (
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
                <th className="px-4 py-2">image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((_, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      // {...register("ProductName")}
                      {...register(`product.${index}.productName`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="file"
                      {...register(`product.${index}.image`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      {...register(`product.${index}.quantity`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      // {...register("rate")}
                      {...register(`product.${index}.rate`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">{12222222}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-4 justify-center items-center">
                      <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mb-4"
                        onClick={() => {
                          addProduct({
                            productName: "",
                            quantity: 0,
                            rate: 0,
                            total: 0,
                            image: "",
                          });
                        }}
                      >
                        Add Item
                      </Button>

                      {fields.length > 1 ? (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          // onClick={() => deleteProduct(index)}
                          onClick={() => removeProduct(index)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          {/* <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mb-4"
            onClick={()=>{
              createProduct({})
            }}
          >
            Add Item
          </Button> */}
          <div className="mr-8">
            <p>Grand Total: {}</p>
            <p>
              Paid Amount:
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(parseInt(e.target.value))}
                className="ml-2"
              />
            </p>
            <p>Due: {}</p>
          </div>
        </div>
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded mt-4"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default PurchaseBill;
