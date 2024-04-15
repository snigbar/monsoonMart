import { TSellerFormSchema } from "@/Schemas/BecomeSeller.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/constants/categories.constants";
import { cn } from "@/lib/utils";

import { useFormContext } from "react-hook-form";

// shopName: string;
// phoneNumber: string;
// description: string;
// productCategories: string[];
// returnPolicy: "maximum 30 days return policy" | "no return policy";

const ShopInformationForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TSellerFormSchema>();

  const watchCategory = watch("productCategories");

  return (
    <div className="my-4 flex flex-col justify-between gap-4">
      <h1 className="text-lg font-medium">Shop Information</h1>
      <Separator orientation="horizontal" />
      {/* shop name */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="w-full">
          <Label htmlFor="shopName">Shop Name</Label>
          <Input
            id="shopName"
            type="text"
            {...register("shopName")}
            placeholder="shop name"
            className="my-2"
          />

          <p className="text-sm text-red-400 h-4">
            {errors.shopName && errors.shopName.message}
          </p>
        </div>
        <div className="w-full">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="text"
            {...register("phoneNumber")}
            placeholder="phone number"
            className="my-2"
          />
          <p className="text-sm text-red-400 h-4">
            {errors.phoneNumber && errors.phoneNumber.message}
          </p>
        </div>
      </div>
      {/* description */}
      <div className="space-y-4 mt-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="shopDescription">Shop Description</Label>
          <Textarea
            id="shopDescription"
            {...register("description")}
            placeholder="describe about your shop withing 150 to 500 characters"
            className="w-full"
            rows={6}
          />
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>
      </div>
      {/* categories */}
      <div className="space-y-4">
        <Label className="my-1">
          Select the categories related to your products
        </Label>
        <Separator orientation="horizontal" />
        <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center text-center items-center gap-y-2 lg:gap-y-4 py-4">
          {categories.map((val, idx) => (
            <Label
              htmlFor={val.name.split(" ").join("-")}
              className={cn(
                "text-sm px-3 py-2 border border-primary text-primary rounded-full",
                {
                  "bg-primary text-white border-transparent":
                    watchCategory && watchCategory.includes(val.name),
                },
              )}
              key={val.name.split(" ").join(`-${idx}`)}
            >
              {val.name}
              <Input
                className="hidden"
                type="checkbox"
                {...register("productCategories")}
                value={val.name}
                id={val.name.split(" ").join("-")}
              />
            </Label>
          ))}
        </div>
        {errors.productCategories && (
          <p className="text-sm text-red-400">
            {errors.productCategories.message}
          </p>
        )}
      </div>
      {/* return policy */}
      <div className="space-y-4 mt-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="return-policy">Return Policy</Label>
          <select
            {...register("returnPolicy")}
            className="w-full py-2 border border-primary px-2 outline-none rounded-sm"
            defaultValue=""
            id="return-policy"
          >
            <option value="">Choose a return policy</option>
            <option value="maximum 30 days return policy">
              Maximum 30 days return policy
            </option>
            <option value="no return policy">No return policy</option>
          </select>
          {errors.returnPolicy && errors.returnPolicy.message && (
            <p className="text-sm text-red-400">
              Please Select a return policy
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopInformationForm;
