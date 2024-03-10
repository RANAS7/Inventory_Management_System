import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/api";
import { useEffect, useState } from "react";
import React from "react";

interface Vendor {
  name: string;
  email: string;
  contact: string;
  contact_person: string;
}

interface ProductDetail {
  quantity: number;
  price: number;
  available: boolean;
  vendor: Vendor;
}

interface Product {
  id: number;
  Product_Name: string;
  Images: string;
  product_detail: ProductDetail[];
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .get("/get-products")
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
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
      setProducts(products.filter((product) => product.id !== productId));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="h-screen">
        <h1 className="text-xl mt-4 ml-10">All Product</h1>
        <Link className="ml-8 text-blue-500" to="/dashboard">
          Dashboard
        </Link>
        / All Product
        <div>
          <Input
            className="md:w-96 md:ml-[850px] md:mb-10 w-72 ml-28 mb-2 mt-4"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader className="text-center">
              <TableRow>
                <TableHead className="w-[100px]">S.N</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Stock Quantity</TableHead>
                <TableHead className="text-center">Option</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((product) =>
                  search.toLowerCase() === ""
                    ? true
                    : product.Product_Name.toLowerCase().includes(
                        search.toLowerCase()
                      )
                )
                .map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.Images}</TableCell>
                    <TableCell>{product.Product_Name}</TableCell>
                    {product.product_detail.map((productD, index) => (
                      <React.Fragment key={index}>
                        <TableCell>{productD.price}</TableCell>
                        <TableCell>{productD.quantity}</TableCell>
                      </React.Fragment>
                    ))}
                    <TableCell className="text-center">
                      <Button onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Product;