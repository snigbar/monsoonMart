import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useLoginMutation } from "@/store/slices/userSlice/user.api";
import { TLoginData } from "@/store/store.interfaces";
import { useToast } from "@/components/ui/use-toast";
import { ApiErrorHadler } from "@/lib/utils";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  const { toast } = useToast();
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "at least 8 characters" })
      .max(20, { message: "maximum 20 characters" }),
  });

  type LoginSchemaType = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [login, { data, isSuccess, error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data: TLoginData) => {
    await login(data);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast({
        title: `Welcome, ${data.data?.firstName}`,
        description: data.message || "login Successful",
      });
      navigate("/", { replace: true });
    }
    // hadle Error
    if (error) {
      ApiErrorHadler(error);
    }
  }, [isSuccess, error]);

  return (
    <Card className="mx-auto max-w-md shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              required
              {...register("email")}
            />

            {errors.email && (
              <span className=" text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                {...register("password")}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            {errors.password && (
              <span className=" text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
        <p className="text-gray-800 text-sm mt-3">
          Don't have an account?
          <Link to="/register" className="font-bold ml-1">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
