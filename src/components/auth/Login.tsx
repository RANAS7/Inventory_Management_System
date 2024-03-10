import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface FormTypes {
  email: string;
  password: string;
}
export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data: FormTypes) => {
    // Todo: api integration
    const response = await axiosInstance.post("/login", {
      email: data.email,
      password: data.password,
    });

    if (!response.data?.success) {
      alert(response.data?.message);
      throw new Error(response?.data?.message);
    }
    localStorage.setItem("token", response?.data?.token);
    navigate("/dashboard");
    return response.data?.token;
  };
  return (
    <div>
      <div>
        <img
          className=" ml-[43%] mt-32 mb-4 rounded-full w-[10%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLcjjUm8rv_lU5GoAuEVrndz0Cr8z7PXr5cWwwKRX5un_9y4Dw_HFnU8LumO8EJ2iXtM&usqp=CAU"
          alt=""
        />
        <div className="flex justify-center  items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="username"
              className="w-80 mb-5"
              {...register("email")}
            />

            <Input
              type="text"
              placeholder="password"
              className="w-80 mb-5"
              {...register("password")}
            />

            <Button type="submit" className="text-center w-24 ml-24">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
