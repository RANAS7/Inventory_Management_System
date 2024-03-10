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

interface ProductDetail {
  map(
    arg0: (productD: any, index: any) => import("react/jsx-runtime").JSX.Element
  ): React.ReactNode;
  quantity: number;
  price: number;
  available: boolean;
  vendor: Vendor;
}

interface Product {
  id: number;
  Product_Name: string;
  Images: string;
  product_detail: ProductDetail;
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
              <TableCell>{purchase.Images}</TableCell>
              <TableCell>{purchase.Product_Name}</TableCell>
              {purchase.product_detail.map((productD) => (
                <React.Fragment key={productD.id}>
                  <TableCell>{productD.vendor.name}</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>total Amount</TableCell>
                  <TableCell>{productD.quantity}</TableCell>
                  <TableCell>{productD.price}</TableCell>
                  <TableCell>Paid Amount</TableCell>
                  <TableCell>Due Amount</TableCell>
                </React.Fragment>
              ))}
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