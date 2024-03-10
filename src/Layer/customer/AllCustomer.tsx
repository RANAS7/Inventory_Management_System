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
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Customer {
  id: number;
  contact_person: string;
  name: string;
  email: string;
  Contact: string;
  address: string;
  Option: string;
}

export function AllCustomer() {
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
  }, []); // Add an empty dependency array to run only once when the component mounts
  const handleDelete = async (id: number) => {
    // Send delete request to the server
    try {
      await axiosInstance.delete(`http://localhost:8080/delete-customer/${id}`); // Corrected endpoint URL

      // If successful, update the UI by removing the deleted user from the state
      setCustomer(customers.filter((customer) => customer.id !== id));
      console.log("customer  Deleted Successfully");
    } catch (err) {
      console.log("Error deleting user:", err);
    }
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Customer List</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Customer List
      <div>
        <Input
          className="md:w-96 md:ml-[850px] md:mb-10 w-72 ml-28 mb-2 mt-4"
          type="text"
          placeholder="search"
        />
      </div>
      <Table className="overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Billing Address</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                {customer.contact_person}
              </TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.Contact}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.Option}</TableCell>
              <TableCell className="text-center ">
                <div className="space-x-2">
                  <Button onClick={() => handleDelete(customer.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default AllCustomer;
