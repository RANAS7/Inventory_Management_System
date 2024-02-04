import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
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
    sn: "1",
    productName: "Apple",
    image: "Product Image show",
    costprice: "Rs. 450",
    stock: "550",
    option: [
      <button className="bg-green-500  m-3 w-12 items-center rounded-sm">
        View
      </button>,
      <button className="bg-white  w-12 items-center rounded-sm">Edit</button>,
      <button className="bg-red-500 m-3 w-12 items-center rounded-sm">
        Delete
      </button>,
    ],
  },
];
const Product = () => {
  return (
    <>
      <div className="h-screen">
        <h1 className="text-xl mt-4 ml-10">All Product</h1>
        <a className="ml-8 text-blue-500" href="#">
          Dashboard
        </a>
        / All Product
        {/* <div className=" flex justify-end mr-10">
          <Button className="w-24 items-center gap-3">
            {" "}
            <FaPlus />
            Create
          </Button>
        </div> */}
        <div>
          <Input
            className="w-96 ml-[850px] mt-6 mb-10"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="mt-4">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="text-center">
              <TableRow>
                <TableHead className="w-[100px]">S.N</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Stock Qnty</TableHead>
                <TableHead className="text-center">option</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.sn}>
                  <TableCell className="font-medium">{invoice.sn}</TableCell>
                  <TableCell>{invoice.image}</TableCell>
                  <TableCell>{invoice.productName}</TableCell>
                  <TableCell>{invoice.costprice}</TableCell>
                  <TableCell>{invoice.stock}</TableCell>
                  <TableCell className="text-center">
                    {invoice.option}
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
