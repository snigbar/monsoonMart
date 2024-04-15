import { Separator } from "@/components/ui/separator";
import { BankData, BankDistricts, Branch } from "../BecomeSeller.interface";
import { useFormContext } from "react-hook-form";
import { TSellerFormSchema } from "@/Schemas/BecomeSeller.schema";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { accountType } from "@/constants/categories.constants";

interface Props {
  banks: null | BankData[];
}

export const BillingInformationForm = ({ banks }: Props) => {
  const [bank, setBank] = useState<string>("");
  const [district, setDistrict] = useState<null | BankDistricts[]>(null);
  const [branches, setBranches] = useState<null | Branch[]>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext<TSellerFormSchema>();

  if (!banks) {
    return (
      <div className="w-full h-full p-8 flex items-center justify-center">
        <p>failed to load data</p>
      </div>
    );
  }
  return (
    <div className="my-4 flex flex-col justify-between items-start gap-4">
      <h1 className="text-lg font-medium">Billing Information</h1>
      <Separator orientation="horizontal" />
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 w-full">
        {/* country & distric */}
        <div className="w-full">
          <Label htmlFor="bankName">Bank Name</Label>
          <select
            id="bankName"
            {...register("bankName")}
            value={bank}
            className="w-full p-2 border border-input outline-none rounded-sm"
            onChange={(e) => {
              setBank(e.target.value);

              const districts = banks.find(
                (val) => val.slug === (e.target.value as string),
              )?.districts;

              if (districts && districts?.length > 0) {
                setDistrict(districts);
              }
            }}
          >
            <option value="">Select Bank</option>
            {banks.map((val, idx) => (
              <option value={val.slug} key={val.slug + idx}>
                {val.name}
              </option>
            ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors && errors.bankName && errors.bankName.message}
          </p>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="districtInBank">Select a District</Label>
          <select
            {...register("bankDistrict")}
            className="w-full p-2 border border-input outline-none rounded-sm"
            id="districtInBank"
            onChange={(e) => {
              const bankBranches = district?.find(
                (val) => val.district_name === e.target.value,
              );
              if (bankBranches && bankBranches.branches?.length > 0)
                setBranches(bankBranches.branches);
            }}
          >
            <option value="" selected>
              Select District
            </option>
            {district &&
              district.map((val) => (
                <option value={val.district_name} key={val.district_name}>
                  {val.district_name}
                </option>
              ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors.bankDistrict && errors.bankDistrict.message}
          </p>
        </div>

        {/* branch name */}
        <div className="w-full">
          <Label htmlFor="branchName">Select a Branch</Label>
          <select
            id="branchName"
            {...register("branchName")}
            className="w-full p-2 border border-input outline-none rounded-sm"
          >
            <option value="">Select Branch</option>
            {branches &&
              branches.map((val, idx) => (
                <option value={val.branch_slug} key={val.branch_slug + idx}>
                  {val.branch_name}
                </option>
              ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors && errors.branchName && errors.branchName.message}
          </p>
        </div>
      </div>

      {/* branch name and account number */}

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 w-full">
        {/* account type */}
        <div className="w-full">
          <Label htmlFor="accountType">Select Account Type</Label>
          <select
            id="accountType"
            {...register("accountType")}
            className="w-full p-2 border border-input outline-none rounded-sm"
          >
            {accountType.map((val, idx) => (
              <option key={idx} value={val}>
                {val}
              </option>
            ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors && errors.accountType && errors.accountType.message}
          </p>
        </div>
        {/* account title */}
        <div className="space-y-2 w-full">
          <Label htmlFor="account-title">Enter Your Account Title</Label>

          <Input id="account-title" {...register("accountTitle")} />

          <p className="text-sm text-red-400 h-4">
            {errors.accountTitle && errors.accountTitle.message}
          </p>
        </div>

        {/* account Number */}
        <div className="space-y-2 w-full">
          <Label htmlFor="account-number">Enter Your Account Number</Label>

          <Input id="account-number" {...register("accountNumber")} />

          <p className="text-sm text-red-400 h-4">
            {errors.accountNumber && errors.accountNumber.message}
          </p>
        </div>
      </div>

      {/* terms and conditions */}
      <div className="items-center flex space-x-4 text-sm md:text-base">
        <input
          id="terms1"
          type="checkbox"
          className="w-5 h-5"
          {...register("termsAndConditionsAgreement")}
        />

        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <p className="text-sm text-red-400 h-4">
          {errors.termsAndConditionsAgreement &&
            errors.termsAndConditionsAgreement.message}
        </p>
      </div>
    </div>
  );
};
