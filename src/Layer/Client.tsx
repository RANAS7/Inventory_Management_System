import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddClientForm } from "./AddClientForm";
import { useState } from "react";

const invoices = [
  {
    invoice: "INV001",
    CLientName: "Ankit Saud",
    address: "lalitpur, Chyasal",
    email: "ankitsadu7@gmail.com",
    number: "9848516176",
    totalpurchase: "20000",
    due: "5000",
    status: "pending",
  },
  {
    invoice: "INV001",
    CLientName: "Ankit Saud",
    address: "lalitpur, Chyasal",
    email: "ankitsadu7@gmail.com",
    number: "9848516176",
    totalpurchase: "20000",
    due: "5000",
    status: "pending",
  },
  {
    invoice: "INV001",
    CLientName: "Ankit Saud",
    address: "lalitpur, Chyasal",
    email: "ankitsadu7@gmail.com",
    number: "9848516176",
    totalpurchase: "20000",
    due: "5000",
    status: "pending",
  },
  {
    invoice: "INV001",
    CLientName: "Ankit Saud",
    address: "lalitpur, Chyasal",
    email: "ankitsadu7@gmail.com",
    number: "9848516176",
    totalpurchase: "20000",
    due: "5000",
    status: "pending",
  },
];
const Client = () => {
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ Client ~ open:", open);
  return (
    <>
      <h1 className="ml-16 mt-2 text-2xl"> Suppliers</h1>
      <div className="w-[90%]  h-auto mx-auto  mt-4 shadow-lg">
        <div className=" flex justify-end mr-10">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="w-24 items-center gap-3"
          >
            {" "}
            <FaPlus />
            Create
          </Button>
        </div>
        <div>
          <Input className="w-96 mx-auto" type="text" placeholder="search" />
        </div>
        {/* this the supplier data table */}
        <div className="mt-4">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="text-center">
              <TableRow>
                <TableHead className="w-[100px]">Ref. No</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>E-Mail</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Total Sale</TableHead>
                <TableHead> Due Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.CLientName}</TableCell>
                  <TableCell>{invoice.address}</TableCell>
                  <TableCell>{invoice.email}</TableCell>
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>{invoice.totalpurchase}</TableCell>
                  <TableCell>{invoice.due}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {open && <AddClientForm open={open} setOpen={setOpen} />}
      </div>
    </>
  );
};

export default Client;
