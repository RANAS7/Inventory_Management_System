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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="company Name"
          className="w-80"
          {...register("email")}
        />

        <Input
          type="text"
          placeholder="company Name"
          className="w-80"
          {...register("password")}
        />

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
