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
import { useChangePasswordMutation } from "@/store/slices/AuthSlice/auth.api";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface TformData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const { forgotPassToken, id } = useParams();
  const navigate = useNavigate();
  const [changePassword, { data, isLoading, isError, error, isSuccess }] =
    useChangePasswordMutation();
  const { toast } = useToast();
  //   if not data return
  if (!forgotPassToken || !id) {
    navigate("/", { replace: true });
    return;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TformData>();

  const onSubmit = (data: TformData) => {
    changePassword({
      payload: { id, password: data.password },
      token: forgotPassToken,
    });
  };

  useEffect(() => {
    if (data && isSuccess && !data.data?.isVerified) {
      toast({
        duration: 10000,
        variant: "success",
        title: "password changed",
        description: data.message || "password has been changed",
      });

      navigate(`/login`, { replace: true });
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
            <Label htmlFor="password">Enter New Password</Label>

            <Input
              id="password"
              placeholder="new password"
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "password should be at least 8 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "password should be less than 20 characters",
                },
              })}
            />

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>

            <Input
              id="password"
              placeholder="confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
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

export default ResetPasswordForm;
