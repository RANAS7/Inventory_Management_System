import React, { useEffect, useState } from "react";
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
import axiosInstance from "@/lib/api";
import { Button } from '@/components/ui/button';
//sadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


interface Vendor {
  id: number;
  name: string;
  email: string;
  contact: string;
  contact_person: string;
  address: string;
}

export function SupplierList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [phone, setPhone]=useState("");
  const[address, setAddress]=useState("");
  const[contactPerson, setContactPerson]=useState("");

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
  }, []); // Make sure to pass an empty dependency array to useEffect to ensure it runs only once
  const handleEdit = (id: number) => {
    setEditId(id);
    const vendor = vendors.find((vendor) => vendor.id === id);
    if (vendor) {
      setUpdateName(vendor.name);

      setUpdateEmail(vendor.email);
      setPhone(vendor.contact);
      setAddress(vendor.address);
      setContactPerson(vendor.contact_person);

   
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`http://localhost:8080/update-vendor/${editId}`, {
        name: updateName,
        Email: updateEmail,
        contact_person:contactPerson,
        address:address,
        Contact:phone,

      });
      console.log("User successfully updated");
      // Refresh user data after update
      const response = await axiosInstance.get(
        "http://localhost:8080/update-vendor"
      );
      setVendors(response.data.data);
      setEditId(null); // Reset edit state after update
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const handleDelete = async (id: number) => {
    // Send delete request to the server
    try {
      await axiosInstance.delete(`http://localhost:8080/delete-vendor/${id}`); // Corrected endpoint URL

      // If successful, update the UI by removing the deleted user from the state
      setVendors(vendors.filter((vendor) => vendor.id !== id));
      console.log("vendor Deleted Successfully");
      
    } catch (err) {
      console.log("Error deleting vendor:", err);
    }
    window.location.reload();
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10 relative">Supplier List</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Supplier List
      <div>
        <Input
          className="w-96 md:ml-[850px] md:mb-10 mb-2 ml-20 mt-10"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead className="text-center">ID</TableHead>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          
          {vendors
            .filter((vendor) =>
              search.toLowerCase() === ""
                ? true
                : vendor.name.toLowerCase().includes(search.toLowerCase())
            )
            

            .map((vendor) =>
            vendor.id === editId ? (
              <tr>
                <TableCell className="text-center">{vendor.id}</TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </TableCell>
               
               
                <TableCell className="text-center">
                  <Button onClick={handleUpdate}>Update</Button>
                </TableCell>
              </tr>
            ) :(
            
            (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.id}</TableCell>
                 <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.contact_person}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.contact}</TableCell>
                <TableCell>{vendor.address}</TableCell>
                <TableCell className="text-center ">
                  <div className="space-x-2">
          
                    <Button onClick={() => handleDelete(vendor.id)}>
                      Delete
                    </Button>
                    <Button onClick={() => handleEdit(vendor.id)}>Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
              )
            ))}
        </TableBody>
      </Table>
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
}

export default SupplierList;