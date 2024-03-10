import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/api";
import { useEffect, useState } from "react";



interface User {
  id: number;
  name: string;
}
interface IForm {
  date: string; // Change to string
  createdby: string;
  staff: string;
  amount: number; // Change to string
  expensetype: string; // Corrected field name
  paymenttype: string; // Corrected field name
  detail: string;
}

const AddExpenses: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [values, setValues] = useState<IForm>({
    date: "",
    createdby: "",
    staff: "", // Make sure staff is of type string
    amount: 0,
    expensetype: "",
    paymenttype: "",
    detail: "",
  });
  
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
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("Sending data:", values);
      await axiosInstance.post("http://localhost:8080/add-salary", values);

      console.log("Salary Successfully Submitted", values);

      alert("Salary Successfully Submitted");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed");
    }
  };

  return (
    <>
      <div className="md:h-[100vh] flex-col">
        <h1 className="text-xl mt-4 ml-10">Expenses</h1>
        <Link className="ml-8 text-blue-500" to="/dashboard">
          Dashboard
        </Link>
        / Expenses
        <div className="bg-white w-[100%]">
          <div>
            <form onSubmit={handleSubmit} action="post">
              <div className="flex mx-auto">
                <div className="w-[80%]">
                  <div className="flex ml-6 mt-4">
                    <h1>Date:</h1>
                    <Input
                      type="date"
                      placeholder=""
                      className="w-80 ml-24"
                      name="date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Created By:</h1>
                    <Input
                      type="text"
                      placeholder="name"
                      className="w-80"
                      onChange={handleChange}
                      name="createdby"
                    />
                  </div>
                  <div className="flex gap-8 ml-6 mt-3">
          <label className="gap-8 flex mt-1">
            Choose User:
            <select
              className="ml- w- py-2 w-80 rounded border border-l-amber-500"
              name="staff"
              onChange={handleChange}
              value={values.staff}
            >
              <option value="choose Option">choose option</option>
              {users.map((user) => (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </div>
                  <div className="flex gap-20 mt-4">
                    <h1 className="ml-4">Amount:</h1>
                    <Input
                      type="text"
                      placeholder="Amount"
                      className="w-80"
                      name="amount"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex ml-6 mt-3">
                    <label className="gap-8 flex mt-1 ">
                      Expenses Type:
                      <select
                        className="ml- w- py-2 w-80 rounded border border-l-amber-500"
                        name="expensetype"
                        onChange={handleChange}
                      >
                        <option value="choose Option">choose option </option>
                        <option value="Salary">Salary </option>
                        <option value="Khaja">Khaja</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex ml-6 mt-3">
                    <label className="gap-8 flex mt-1 ">
                      Payment Type:
                      <select
                        className="ml- w- py-2 w-80 rounded border border-l-amber-500"
                        name="paymenttype"
                        onChange={handleChange}
                      >
                        <option value="select one">choose option </option>
                        <option value="cash">cash</option>
                        <option value="Bank Account">Bank Account</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex gap-24 mt-4">
                    <h1 className="ml-4">Details</h1>
                    <Input
                      type="text"
                      placeholder="expense details"
                      className="w-80"
                      name="detail"
                      onChange={handleChange}
                    />
                  </div>
                  <Button className="ml-52 mt-10 w-36">Save</Button>
                </div>
                <div className="w-[100%] ml-10">
                  <h1 className="ml-10 text-center mb-10 text-3xl">
                    {" "}
                    <Button type="submit">Add Expenses Type</Button>
                  </h1>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* here */}
      </div>
    </>
  );
};

export default AddExpenses;
