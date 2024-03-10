import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z, ZodError } from "zod";
import axiosInstance from "@/lib/api";
import { Input } from "@/components/ui/input";

const AddSupplier: React.FC = () => {
  interface IForm {
    supplier: string;
    email: string;
    phone: string;
    address: string;
    contactPerson: string;
  }

  const schema = z.object({
    supplier: z.string().nonempty(),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    address: z.string().nonempty(),
    contactPerson: z.string().nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      supplier: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
    },
  });
  const createSupplier = async (data: IForm) => {
    const response = await axiosInstance.post("/add-vendor", data);
    return response.data;
  };
  const onSubmit = async (data: IForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    await createSupplier(data);
    alert("User created successfully");
    console.log("User created successfully");
  };

  // const onSubmit = async (data: IForm) => {
  //   try {
  //     schema.parse(data);
  //     console.log("🚀 ~ onSubmit ~ data:", data);
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       console.log("Validation errors:", error.errors);
  //     }
  //   }
  // };
  // console.log("gbbbbb", watch("phone"));

  // const createUser = async (data: IForm) => {
  //   const response = await axiosInstance.post("/add-vendor", data);
  //   return response.data;
  // };

  return (
    <div className="md:h-[100vh]  flex-col">
      <h1 className="text-xl mt-4 ml-10">Add Supplier</h1>
      <Link className="ml-8 text-blue-500" to="/dashboard">
        Dashboard
      </Link>
      / Add Supplier
      <div>
        <hr className="md:w-[1250px] mt-10 mx-4 bg-red-600 h-[3px]" />
      </div>
      <div className="mt-10 p-6 bg-gray- rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-full h-auto">
            <div className="flex mx-auto">
              <div className="w-full">
                <div className="flex gap-16 mt-4">
                  <h1 className="ml-4">Supplier Name:</h1>
                  <Input
                    type="text"
                    placeholder="Company Name"
                    className="w-80"
                    {...register("supplier", { required: true })}
                  />
                  {errors.supplier && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="flex gap-[60px] mt-4">
                  <h1 className="ml-4">Contact Person:</h1>
                  <Input
                    type="text"
                    placeholder="Contact Person"
                    className="w-80"
                    {...register("contactPerson", { required: true })}
                  />
                  {errors.contactPerson && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="flex gap-[124px] mt-4">
                  <h1 className="ml-4">E-mail:</h1>
                  <Input
                    type="text"
                    placeholder="Email"
                    className="w-80"
                    {...register("email")}
                  />
                </div>
                <div className="flex gap-[124px] mt-4">
                  <h1 className="ml-4">Phone </h1>
                  <Input
                    type="text"
                    placeholder="Phone number"
                    className="w-80"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="flex gap-28 mt-4">
                  <h1 className="ml-4">Address</h1>
                  <Input
                    type="text"
                    placeholder="Address"
                    className="w-80"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <span className="text-red-600">This field is required</span>
                  )}
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
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
