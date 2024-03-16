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
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      supplierName: "",
      date: "",
      product: [{ productName: "", quantity: 0, rate: 0, image: [] }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "product",
  });

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

  // const onSubmit = async (data: any) => {

  //   console.log("Form data:", data);
  //   try {
  //     // const formDataArray: FormData[] = [];

  //     // fields.forEach((product: any, index: number) => {
  //       const formData = new FormData();

  //       // Append regular form fields
  //       formData.append("supplierName", data.supplierName);
  //       formData.append("date", data.date);

  //       // Append product data
  //       // formData.append(`product[${index}].productName`, product.productName);
  //       // formData.append(`product[${index}].quantity`, product.quantity);
  //       // formData.append(`product[${index}].rate`, product.rate);

  //       // Append image if it exists
  //       // if (product.image.length > 0) {
  //       //   // If you're allowing multiple images per product, you need to loop through them
  //       //   for (let i = 0; i < product.image.length; i++) {
  //       //     formData.append(`product[${index}].images`, product.image[i]);
  //       //   }
  //       }

  // //       formDataArray.push(formData);
  // //     });

  // //     // Submit each FormData object individually
  // //     for (const formData of formDataArray) {
  // //       const response = await axiosInstance.post("/addProduct", formData);
  // //       console.log("Response:", response.data);
  // //     }
  // //   } catch (error) {
  // //     console.error("Error submitting form:", error);
  // //     // Handle error
  // //   }
  // // };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Append regular form fields
    formData.append("supplierName", data.supplierName);
    formData.append("date", data.date);

    // Append product data
    fields.forEach((product: any, index: number) => {
      console.log(product);
      formData.append(`product[${index}].productName`, product.productName);
      formData.append(`product[${index}].quantity`, product.quantity);
      formData.append(`product[${index}].rate`, product.rate);

      formData.append(`product[${index}].image`, product.image[0]);
    });

    // Submit FormData
    try {
      const response = await axiosInstance.post("/addProduct", formData);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  const handleClick = () => {
    append({ productName: "", quantity: 0, rate: 0, image: [] });
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
              <option value="">Choose option</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex md:gap-5 gap-10 mt-4 mb-10">
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
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((_item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <Input
                      type="text"
                      {...register(`product.${index}.productName`)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="file"
                      className="w-full"
                      {...register(`product.${index}.image`)}
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
                  <td className="border px-4 py-2">{}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-4 justify-center items-center">
                      <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4"
                        onClick={handleClick}
                      >
                        Add Item
                      </Button>
                      {fields.length > 1 && (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="mr-8">
            <p>Grand Total: {}</p>
            <p>
              Paid Amount:
              <Input
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mt-4"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default PurchaseBill;
