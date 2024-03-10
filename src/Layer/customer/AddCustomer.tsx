import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import axios, { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "@/lib/api";

const AddCustomer: React.FC = () => {
  interface IForm {
    customer: string;
    email: string;
    phone: string;
    address: string;
    contactPerson: string;
  }
  const { register, handleSubmit,} = useForm({
    defaultValues: {
      customer: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
    },
  });


  const createUser = async (data: IForm) => {
    const response = await axiosInstance.post(
      "http://localhost:8080/add-customer",
      data
    );
    return response.data;
  };
  const onSubmit = async (data: IForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    await createUser(data);
    alert("customer added successfully");
    console.log("User created successfully");
  };

  return (
    <div className="md:h-[100vh] flex-col">
      <h1 className="text-xl mt-4 ml-10">Add Customer</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Add Customer
      <div>
        <hr
          className="md:w-[1250px]  mt-10 mx-4
           bg-red-600 h-[3px]"
        />
      </div>
      <div className=" mt-8 p-6  bg-gray- rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-[100%]">
            <div>
              <div className="flex mx-auto">
                <div className="md:w-[80%] w-[100%]">
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Company Name:</h1>
                    <Input
                      type="text"
                      placeholder="company Name"
                      className="w-80"
                      {...register("customer")}
                    />
                  </div>
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Contact Person:</h1>
                    <Input
                      type="text"
                      placeholder="contact Person"
                      className="w-80"
                      {...register("contactPerson")}
                    />
                  </div>
                  <div className="flex gap-32 mt-4">
                    <h1 className="ml-4">E-mail:</h1>
                    <Input
                      type="text"
                      placeholder="email"
                      className="w-80"
                      {...register("email")}
                    />
                  </div>
                  <div className="flex gap-32 mt-4">
                    <h1 className="ml-4">Phone </h1>
                    <Input
                      type="text"
                      placeholder="phone number"
                      className="w-80"
                      {...register("phone")}
                    />
                  </div>
                  <div className="flex gap-32 mt-4">
                    <h1 className="ml-4">Address</h1>
                    <Input
                      type="text"
                      placeholder="Address"
                      className="w-80"
                      {...register("address")}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-blue-500 w-28 ml-52 md:mt-10 mt-6 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
