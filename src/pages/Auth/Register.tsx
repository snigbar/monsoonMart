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
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { CameraIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const MAX_FILE_SIZE = 500000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result.toString()); // Set the selected image URL to the FileReader result
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const signUpSchema = z
    .object({
      firstName: z
        .string()
        .min(3)
        .max(10)
        .regex(/^[A-Za-z]+$/, {
          message: "First name should only contain letters",
        }),
      lastName: z
        .string()
        .min(3)
        .max(10)
        .regex(/^[A-Za-z]+$/, {
          message: "Last name should only contain letters",
        }),
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "at least 8 characters" })
        .max(20, { message: "maximum 20 characters" }),
      confirmPassword: z
        .string()
        .min(8, { message: "at least 8 characters" })
        .max(20, { message: "maximum 20 characters" }),
      profileImage: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine(
          (files) => files?.[0]?.size <= MAX_FILE_SIZE,
          `Max file size is 5MB.`,
        )
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          ".jpg, .jpeg, .png and .webp files are accepted.",
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "password didn't match",
    });

  type signUpSchemaType = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<signUpSchemaType> = (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profileImage", data.profileImage[0]);
    console.log(formData.getAll("profileImage"));
  };

  return (
    <div className="w-full py-2">
      <Card className="mx-auto max-w-md lg:max-w-lg shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="firstName">First Name</Label>

                <Input
                  id="firstName"
                  placeholder="First Name"
                  type="text"
                  required
                  {...register("firstName")}
                />

                {errors.firstName && (
                  <span className=" text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="lastName">Last Name</Label>

                <Input
                  id="lastName"
                  placeholder="Last Name"
                  type="text"
                  required
                  {...register("lastName")}
                />

                {errors.lastName && (
                  <span className=" text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
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
            {/* password */}
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="password">Password</Label>
                <div className="flex relative">
                  <Input
                    id="password"
                    autoComplete="true"
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
              {/* confirm password */}
              <div className="space-y-2 w-full">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="flex">
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    autoComplete="true"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className=" text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="picture">Picture</Label>
              <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                <Avatar className="h-16 w-16">
                  <label htmlFor="picture">
                    <AvatarImage
                      src={
                        selectedImage
                          ? selectedImage
                          : "https://github.com/shadcn.png"
                      }
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <CameraIcon className="h-10 w-10 bg-white" />
                    </AvatarFallback>
                  </label>
                </Avatar>
                <Input
                  id="picture"
                  type="file"
                  {...register("profileImage")}
                  className="max-w-xs"
                  onChange={handleImageChange}
                />
              </div>
              {errors.profileImage && (
                <span className=" text-red-500 text-sm">
                  {errors.profileImage.message as string}
                </span>
              )}
            </div>

            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>
          <p className="text-gray-800 text-sm mt-3">
            Already have an account?
            <Link to="/login" className="font-bold ml-1">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
