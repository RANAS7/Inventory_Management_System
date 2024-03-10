import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/api";

const AddStaff: React.FC = () => {
  interface IForm {
    username: string;
    fullname: string;
    password: string;
    usertype: string;
  }
  // // Define the data interface (optional but recommended)
  // interface PostData {
  //   key1: string;
  //   key2: string;
  // }

  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      usertype: "",
    },
  });

  const createUser = async (data: IForm) => {
    const response = await axiosInstance.post("/user", data);
    return response.data;
  };
  const onSubmit = async (data: IForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    await createUser(data);
    alert("User created successfully");
    console.log("User created successfully");
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Add Staff Information</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Add Staff information
      <div>
        <hr className="md:w-[1250px] mt-10 mx-4 bg-red-600 h-[3px]" />
      </div>
      <div className="mt-8 p-6 bg-gray- rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-[100%] h-auto">
            <div>
              <div className="flex mx-auto">
                <div className="md:w-[80%] w-[100%]">
                  <div className="flex  md:gap-0 gap-10 mt-4">
                    <h1 className="md:ml-4 w-32">username:</h1>
                    <Input
                      type="username"
                      placeholder="user name"
                      className="md:w-80"
                      {...register("username")}
                    />
                  </div>
                  <div className="flex md:gap-0 gap-0 mt-4">
                    <h1 className="md:ml-4 w-32">Full Name:</h1>
                    <Input
                      type="text"
                      placeholder="name"
                      className="w-80"
                      {...register("fullname")}
                    />
                  </div>
                  <div className="flex  md:gap-16 gap-10  mt-4">
                    <h1 className="ml-4">Password:</h1>
                    <Input
                      type="password"
                      placeholder="password"
                      className="w-80"
                      {...register("password")}
                    />
                  </div>
                  <div className="flex  md:gap-16 gap-10  mt-4">
                    <h1 className="ml-4">User Type</h1>
                    <Input
                      type="text"
                      placeholder="user type"
                      className="w-80"
                      {...register("usertype")}
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="md:ml-52 ml-36 mt-10 w-24 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
