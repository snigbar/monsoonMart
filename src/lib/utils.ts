import { toast } from "@/components/ui/use-toast";
import { TUserCreationResponse } from "@/store/store.interfaces";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ApiErrorHadler = (
  error: FetchBaseQueryError | SerializedError | Error,
) => {
  // for  FetchBaseQueryError
  if ("data" in error) {
    toast({
      variant: "destructive",
      title:
        (error.data as TUserCreationResponse)?.message ||
        "something went wrong",
    });
  }
  // for  SerializedError
  if ("error" in error) {
    toast({
      variant: "destructive",
      title: error.status.toString(),
      description: error.error.toString(),
    });
  }
};
