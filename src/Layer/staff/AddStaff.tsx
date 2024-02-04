import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddStaff: React.FC = () => {
  const [supplier, setSupplier] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission, like sending data to a server or updating state
    console.log({
      supplier,
      contactPerson,
      email,
      phone,
      address,
    });
    // Reset the form fields after submission
    setSupplier("");
    setContactPerson("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Add Staff Information</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Add Staff information
      <div>
        <hr
          className="w-[1250px]  mt-10 mx-4
           bg-red-600 h-[3px]"
        />
      </div>
      <div className=" mt-8 p-6  bg-gray- rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="bg-white w-[100%] h-auto">
            <div>
              <div className="flex mx-auto">
                <div className="w-[80%]">
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">User Name:</h1>
                    <Input
                      type="text"
                      placeholder="user name"
                      className="w-80"
                    />
                  </div>
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Full Name:</h1>
                    <Input type="text" placeholder="name" className="w-80" />
                  </div>
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">password:</h1>
                    <Input
                      type="text"
                      placeholder="password"
                      className="w-80"
                    />
                  </div>
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">User Type </h1>
                    <Input
                      type="text"
                      placeholder="user type"
                      className="w-80"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="ml-52 mt-10 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Staff
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
