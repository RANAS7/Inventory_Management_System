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
import { Button } from "@/components/ui/button";

interface Vendor {
  name: string;
}
interface Product {
  id: number;
  product: string;
  date: string;
  image: File | String;
  quantity: number;
  price: number;
  vendor: Vendor;
}
export function ProductList() {
  const [purchases, setPurchases] = useState<Product[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [updateProduct, setUpdateProdct] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState<File | String>("");
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const [updatePrice, setUpdatePrice] = useState(0);

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

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/delete-product/${id}`);
      // After deletion, fetch updated product list
      setPurchases(purchases.filter((purchase) => purchase.id !== id));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    const purchase = purchases.find((purchase) => purchase.id === id);
    if (purchase) {
      setUpdateProdct(purchase.product);
      setUpdateDate(purchase.date);
      setUpdateQuantity(purchase.quantity);
      setUpdatePrice(purchase.price);
      setUpdateImage(purchase.image);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("product", updateProduct);
      formData.append("date", updateDate);
      formData.append("quantity", String(updateQuantity));
      formData.append("price", String(updatePrice));
      if (updateImage) {
        formData.append("productImg", updateImage);
      }
      await axiosInstance.put(`/update-product/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product successfully updated");
      const response = await axiosInstance.get("/get-products");
      setPurchases(response.data);
      setEditId(null);
    } catch (err) {
      console.error("Error updating product", err);
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
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase, index) =>
            purchase.id === editId ? (
              <tr key={purchase.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">
                  <input
                    type="file"
                    onChange={(e) => setUpdateImage(e.target.files)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={updateProduct}
                    onChange={(e) => setUpdateProdct(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="number"
                    value={updateQuantity}
                    onChange={(e) => setUpdateQuantity(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    className="text-center"
                    onChange={(e) => setUpdatePrice(e.target.value)}
                  ></input>
                </TableCell>
                <TableCell className="text-center">
                  <Button onClick={handleUpdate}>Update</Button>
                </TableCell>
              </tr>
            ) : (
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
                <TableCell>{purchase.date}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{purchase.price}</TableCell>
                <TableCell className="text-center">
                  <Button onClick={() => handleDelete(purchase.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleEdit(purchase.id)}>Edit</Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default ProductList;
