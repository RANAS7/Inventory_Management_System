import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/api";
import React from "react";
import { Button } from "@/components/ui/button";

interface Vendor {
  name: string;
  email: string;
  contact: string;
  contact_person: string;
}
interface Product {
  id: number;
  product: string;
  image: string;
  quantity: number;
  price: number;
  vendor: Vendor;
}
export function ProductList() {
  const [purchases, setPurchases] = useState<Product[]>([]);
  useEffect(() => {
    axiosInstance
      .get("/get-products")
      .then((res) => {
        if (res.data) {
          setPurchases(res.data);
          console.log("Products are successfully fetched", res.data);
        } else {
          console.error("No data found in the response");
        }
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, []);

  const handleDelete = async (productId: number) => {
    try {
      await axiosInstance.delete(`/delete-product/${productId}`);
      // After deletion, fetch updated product list
      setPurchases(purchases.filter((purchase) => purchase.id !== productId));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Product List</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      /ProductList
      <div>
        <Input
          className="md:w-96 md:ml-[850px] md:mb-10 w-72 ml-28 mb-2 mt-4"
          type="text"
          placeholder="search"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead className="text-center">Ref No.</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Product</TableHead>
            <TableHead className="text-center">Supplier</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">paid Amount</TableHead>
            <TableHead className="text-center">Due Amount</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              {/* <TableCell>{product.id}</TableCell> */}
              <TableCell>
                {(() => {
                  let sn = 0;
                  for (let i = 0; i <= purchases.length; i++) {
                    sn += i;
                  }
                  return sn;
                })()}
              </TableCell>
              <TableCell>Ref No.</TableCell>
              <TableCell>
                <img
                  src={`http://localhost:8080/images/${purchase.image}`}
                  alt={purchase.product}
                  className="mt-2 w-24 h-24"
                />
              </TableCell>
              <TableCell>{purchase.product}</TableCell>
              <TableCell>{purchase.vendor.name}</TableCell>
              <TableCell>total Amount</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>{purchase.price}</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>Due Amount</TableCell>
              <TableCell className="text-center">
                <Button onClick={() => handleDelete(purchase.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ProductList;
