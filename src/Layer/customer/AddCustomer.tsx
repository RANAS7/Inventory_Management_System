import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const AddCustomer: React.FC = () => {
  interface IForm {
    supplier: string;
    email: string;
    phone: string;
    address: string;
    contactPerson: string;
  }
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      supplier: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
    },
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setForm({
  //     supplier: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     contactPerson: "",
  //   });
  // };

  const onSubmit = async (data: IForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  console.log("gbbbbb", watch("phone"));
  return (
    <div>
      <h1 className="text-xl mt-4 ml-10">Add Customer</h1>
      <a className="ml-8 text-blue-500" href="#">
        Dashboard
      </a>
      / Add Customer
      <div>
        <hr
          className="w-[1250px]  mt-10 mx-4
           bg-red-600 h-[3px]"
        />
      </div>
      <div className=" mt-8 p-6  bg-gray- rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-[100%] h-screen">
            <div>
              <div className="flex mx-auto">
                <div className="w-[80%]">
                  <div className="flex gap-16 mt-4">
                    <h1 className="ml-4">Company Name:</h1>
                    <Input
                      type="text"
                      placeholder="company Name"
                      className="w-80"
                      {...register("email")}
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
                    className="bg-blue-500 w-28 ml-52 mt-10 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
