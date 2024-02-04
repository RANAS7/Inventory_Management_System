import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

function AddSupplier() {
  const [formData, setFormData] = useState({
    supplierName: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform form validation here
    if (formData.supplierName.trim() === "") {
      alert("Supplier Name is required");
      return;
    }
    if (formData.contactPerson.trim() === "") {
      alert("Contact Person is required");
      return;
    }
    if (formData.email.trim() === "") {
      alert("Email is required");
      return;
    }
    // Add more validation rules as needed

    // If validation passes, you can submit the form or perform other actions
    console.log("Form submitted:", formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Add Supplier</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Add Supplier
      <div>
        <hr
          className="w-[1250px]  mt-10 mx-4
           bg-red-600 h-[3px]"
        />
      </div>
      <div className=" mt-8 p-6  bg-gray- rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="bg-white w-[100%] h-screen">
            <div>
              <div className="flex mx-auto">
                <div className="w-[80%]">
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Supplier Name:</h1>
                    <input
                      type="text"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-80"
                    />
                  </div>
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Contact Person:</h1>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Contact Person"
                      className="w-80"
                    />
                  </div>
                  <div className="flex gap-32 mt-4">
                    <h1 className="ml-4">E-mail:</h1>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-80"
                    />
                  </div>
                  <div className="flex gap-32 mt-4">
                    <h1 className="ml-4">Phone </h1>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-80"
                    />
                  </div>
                  <div className="flex gap-32 mt-4">
                    <h1 className="ml-4">Address</h1>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="w-80"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-28 ml-52 mt-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* here */}
    </div>
  );
}

export default AddSupplier;
