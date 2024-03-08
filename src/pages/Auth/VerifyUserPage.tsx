import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { ApiErrorHadler } from "@/lib/utils";
import {
  useRevalidateMutation,
  useVerifyUserMutation,
} from "@/store/slices/AuthSlice/auth.api";
import { TErrorResponse } from "@/store/store.interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyUserPage() {
  const { id, activationToken } = useParams();
  const [checkEmail, setCheckEmail] = useState(false);
  const navigate = useNavigate();
  if (!id || !activationToken) {
    navigate("/", { replace: true });
    return;
  }

  const { toast } = useToast();

  // verify user
  const [verifyUser, { data, isLoading, isSuccess, isError, error }] =
    useVerifyUserMutation();

  const [
    revalidate,
    {
      data: revalidteData,
      isSuccess: isRevalidationSuccess,
      isLoading: isRevalidationLoading,
      isError: isRevalidationError,
      error: revalidationError,
    },
  ] = useRevalidateMutation();

  // verify user
  useEffect(() => {
    verifyUser({ id, activationToken });
  }, []);

  // handle response
  useEffect(() => {
    // validation success
    if (data && isSuccess) {
      toast({
        variant: "success",
        title: `validation successful`,
        description: data?.message || "your account has been validated",
      });
      navigate("/");
    }
    // revalidation success
    if (revalidteData && isRevalidationSuccess) {
      toast({
        variant: "warn",
        title: `Check your email`,
        description:
          data?.message || "Check your email to validate your account",
      });
      setCheckEmail(true);
    }
    // hadle Error
    if (!isRevalidationSuccess && isError && error) {
      ApiErrorHadler(error);
    }

    if (isRevalidationError && revalidationError) {
      ApiErrorHadler(revalidationError);
    }
  }, [isSuccess, isError, isRevalidationError, isRevalidationSuccess]);

  if (isLoading) {
    return <LoadingSpinner className="w-20 h-20" />;
  }

  // check if token expired and send revalidation request
  if (
    isError &&
    error &&
    "data" in error &&
    // check if the token expired
    /jwt\s+expired/i.test((error.data as TErrorResponse)?.message)
  ) {
    return (
      <div className="w-full">
        {checkEmail && (
          <div className="p-2 bg-amber-200 text-orange-900 text-center text-sm font-semibold my-3 mx-auto w-11/12 md:w-2/5  rounded-md">
            <p>Please validate your account by checking your email</p>
          </div>
        )}
        <div className="max-w-sm p-4 rounded-md text-center bg-white shadow-md mx-auto">
          <p className="my-4">
            Your session has expired, and you need to revalidate your email
            address to continue. Click the button below to receive a new
            validation link.
          </p>
          <Button
            variant="default"
            onClick={() => revalidate(id)}
            disabled={isRevalidationSuccess || isRevalidationLoading}
          >
            Revalidate Email
          </Button>
        </div>
      </div>
    );
  }

  return <div>verifyUserPage</div>;
}
