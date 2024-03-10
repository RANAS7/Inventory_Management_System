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

interface User {
  id: number;
  name: string;
  Email: string;
  Role: string;
}
export function ListStaff() {
  const [users, setUsers] = useState<User[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateRole, setUpdateRole] = useState("");

  useEffect(() => {
    // Fetch users when the component mounts
    axiosInstance
      .get("http://localhost:8080/get-users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // Add an empty dependency array to run only once when the component mounts

  const handleDelete = async (id: number) => {
    // Send delete request to the server
    try {
      await axiosInstance.delete(`http://localhost:8080/delete-user/${id}`); // Corrected endpoint URL

      // If successful, update the UI by removing the deleted user from the state
      setUsers(users.filter((user) => user.id !== id));
      console.log("User Deleted Successfully");
    } catch (err) {
      console.log("Error deleting user:", err);
    }
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    const user = users.find((user) => user.id === id);
    if (user) {
      setUpdateName(user.name);
      setUpdateEmail(user.Email);
      setUpdateRole(user.Role);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`http://localhost:8080/update-user/${editId}`, {
        name: updateName,
        Email: updateEmail,
        Role: updateRole,
      });
      console.log("User successfully updated");
      // Refresh user data after update
      const response = await axiosInstance.get(
        "http://localhost:8080/get-users"
      );
      setUsers(response.data.data);
      setEditId(null); // Reset edit state after update
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Staff List</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Staff List
      <div>
        <Input
          className="md:w-96 md:ml-[850px] md:mb-10 w-72 mx-auto mb-2 mt-4"
          type="text"
          placeholder="search"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">User Name</TableHead>
            <TableHead className="text-center">Full Name</TableHead>
            <TableHead className="text-center">User type / Position</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) =>
            user.id === editId ? (
              <tr>
                <TableCell className="text-center">{user.id}</TableCell>
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
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    value={updateRole}
                    onChange={(e) => setUpdateRole(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button onClick={handleUpdate}>Update</Button>
                </TableCell>
              </tr>
            ) : (
              <TableRow key={user.id}>
                <TableCell className="text-center">{user.id}</TableCell>
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center">{user.Email}</TableCell>
                <TableCell className="text-center">{user.Role}</TableCell>
                <TableCell className="text-center ">
                  <div className="space-x-2">
                    <Button className="" onClick={() => handleEdit(user.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListStaff;
