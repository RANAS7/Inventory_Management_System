import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/api";
import { Input } from "@/components/ui/input";

//sadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  sn: number;
  name: string;
  quantity: number;
  rate: number;
  total: number;
  availableQuantity: number;
  discount: number;
  paymentType: string; // Payment Type: Cash, Bank Account, Cheque
}
interface Customer {
  id: number;
  contact_person: string;
  name: string;
  email: string;
  Contact: string;
  address: string;
  Option: string;
}

const AddBill: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      sn: 1,
      name: "",
      quantity: 0,
      rate: 0,
      availableQuantity: 0,
      total: 0,
      discount: 0,
      paymentType: "",
    },
  ]);

  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>(""); // State for Payment Type
  const [customers, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    // Fetch users when the component mounts
    axiosInstance
      .get("http://localhost:8080/get-customers")
      .then((response) => {
        setCustomer(response.data.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const deleteProduct = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const calculateGrandTotal = () => {
    return products.reduce((acc, curr) => acc + curr.total, 0);
  };

  const calculateTotalDiscount = () => {
    return products.reduce((acc, curr) => acc + curr.discount, 0);
  };

  const calculateDue = () => {
    return calculateGrandTotal() - paidAmount;
  };

  interface IForm {
    CustomerName: string;
    date: Number;
    product: Product[];
  }
  const createProduct = async (data: IForm) => {
    const response = await axiosInstance.post("/addProduct", data);
    return response.data;
  };
  const { register, handleSubmit, watch, control } = useForm<IForm>({
    defaultValues: {
      product: products,
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
  console.log("foem data", watch("product"));
  const onSubmit = async (data: IForm) => {
    console.log("data ,", data);
    console.log("purchase successfully");
  };

  return (
    <div className="md:h-[100vh] flex-col overflow-scroll">
      <h1 className="text-xl mt-4 ml-10">Add Sale Bill</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Add Sale Bill
      <div>
        <hr className="md:w-[1250px] mt-10 mx-4 bg-red-600 h-[3px]" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex ml-6 mt-3">
          <label className="gap-8 flex mt-1 ">
            Customer Name:
            <select
              className="ml- w- py-2 w-80 rounded border border-l-amber-500"
              {...register("CustomerName")}
            >
              <option value="choose Option">choose option </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex  md:gap-7 gap-10 mt-4 mb-10">
          <h1 className="md:ml-4 w-32">Date:</h1>
          <Input
            type="date"
            placeholder="date"
            className="md:w-80"
            {...register("date")}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="md:table-auto w-full overflow-x">
            <thead>
              <tr>
                <th className="px-4 py-2">SN</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Available Quantity</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Total</th>
                {/* <th className="px-4 py-2">Payment Type</th> */}
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((product, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <Input
                      type="text"
                      {...register(`product.${index}.name`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      {...register(`product.${index}.availableQuantity`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      {...register(`product.${index}.quantity`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      {...register(`product.${index}.rate`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      {...register(`product.${index}.discount`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      {...register(`product.${index}.total`)}
                      className="w-full"
                    />
                  </td>
                  {/* <td className="border px-4 py-2">
                    <select
                      name="paymentType"
                      value={product.paymentType}
                      onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].paymentType = e.target.value;
                        setProducts(newProducts);
                      }}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Account">Bank Account</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </td> */}
                  <td className="border px-4 py-2">
                    <div className="flex gap-4 justify-center items-center">
                      <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mb-4"
                        onClick={() => {
                          addProduct({
                            sn: 1,
                            name: "",
                            quantity: 0,
                            rate: 0,
                            availableQuantity: 0,
                            total: 0,
                            discount: 0,
                            paymentType: "",
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
        <div className="mt-4 flex justify-end items-end">
          <div className="mr-8">
            <p>Grand Total: {calculateGrandTotal()}</p>
            <p>Total Discount: {calculateTotalDiscount()}</p>
            <p className="flex">
              Paid Amount:
              <Input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(parseInt(e.target.value))}
                className="ml-2"
              />
            </p>

            <p>
              Payment Type:
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Bank Account">Bank Account</option>
                <option value="Cheque">Cheque</option>
              </select>
            </p>
            <p>Due: {calculateDue()}</p>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 ml-2 px-4 rounded mt-4"
          type="submit"
        >
          Save
        </button>
      </form>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AddBill;
