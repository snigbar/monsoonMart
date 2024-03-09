import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { ApiErrorHadler } from "@/lib/utils";
import { useForgotPasswordMutation } from "@/store/slices/AuthSlice/auth.api";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [
    forgotPasswordRequest,
    { data, isLoading, isSuccess, isError, error },
  ] = useForgotPasswordMutation();

  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    forgotPasswordRequest(data);
  };

  useEffect(() => {
    if (data && isSuccess && !data.data?.isVerified) {
      toast({
        duration: 10000,
        variant: "warn",
        title: "Check Your Email",
        description: data.message || "Check your email to reset your password",
      });

      navigate(`/`, { replace: true });
    }
    // hadle Error
    if (error) {
      ApiErrorHadler(error);
    }
  }, [isError, isSuccess]);

  return (
    <Card className="mx-auto max-w-md shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          A password reset link will be sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Enter Your Email</Label>

            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? <LoadingSpinner /> : "send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
