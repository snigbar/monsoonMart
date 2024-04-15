import { TSellerFormSchema } from "@/Schemas/BecomeSeller.schema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { divisions } from "@/constants/becomeSeller.constants";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { TLocationApiResponse } from "../BecomeSeller.interface";

interface Props {
  cityInfo: null | TLocationApiResponse;
  upazilla: string[];
  setUpazilla: Dispatch<SetStateAction<string[]>>;
  setCityInfoUrl: Dispatch<SetStateAction<string>>;
  setCityInfo: Dispatch<SetStateAction<TLocationApiResponse | null>>;
}

const ShopAddressForm = ({
  cityInfo,
  setCityInfoUrl,
  setUpazilla,
  upazilla,
  setCityInfo,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSellerFormSchema>();

  return (
    <div className="my-4 flex flex-col justify-between items-start gap-4">
      <h1 className="text-lg font-medium">Address Information</h1>
      <Separator orientation="horizontal" />
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 w-full">
        {/* country & distric */}
        <div className="w-full">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            {...register("country")}
            placeholder="Bangladesh"
            className="my-2"
            value="Banladesh"
            readOnly
          />

          <p className="text-sm text-red-400 h-4">
            {errors && errors.country && errors.country.message}
          </p>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="divisions">Division</Label>
          <select
            {...register("division")}
            className="w-full p-2 border border-input outline-none rounded-sm"
            id="divisions"
            onChange={(e) => {
              if (e.target.value) {
                setCityInfoUrl(
                  `https://bdapis.com/api/v1.1/division/${e.target.value}`,
                );
                setCityInfo(null);
              } else {
                setCityInfoUrl("");
                setCityInfo(null);
              }
            }}
          >
            <option value="">Select a Division</option>
            {divisions.map((val, idx) => (
              <option value={val} key={val + idx}>
                {val}
              </option>
            ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors.division && errors.division.message}
          </p>
        </div>
      </div>

      {/*city, upazillas and postcode */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="city">City</Label>
          <select
            {...register("city")}
            className="w-full py-2 border border-input px-2 outline-none rounded-sm"
            id="city"
            onChange={(e) => {
              if (e.target.value) {
                const district = cityInfo?.data.find(
                  (val) => val.district === e.target.value,
                );
                if (district && district.upazilla.length > 0) {
                  setUpazilla([e.target.value, ...district.upazilla]);
                } else setUpazilla([""]);
              } else {
                setUpazilla([""]);
              }
            }}
          >
            <option value="">Select City</option>
            {cityInfo &&
              cityInfo.data &&
              cityInfo.data.map((val, idx) => (
                <option key={val.district + idx} value={val.district}>
                  {val.district}
                </option>
              ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors.city && errors.city.message}
          </p>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="upazilla">Upazilla</Label>
          <select
            {...register("upazilla")}
            className="w-full py-2 border border-input px-2 outline-none rounded-sm"
            id="upazilla"
          >
            <option value="">Select Upazilla</option>
            {cityInfo &&
              upazilla.length > 0 &&
              upazilla.map((val, idx) => (
                <option key={val + idx} value={val}>
                  {val}
                </option>
              ))}
          </select>

          <p className="text-sm text-red-400 h-4">
            {errors.upazilla && errors.upazilla.message}
          </p>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            type="text"
            {...register("postCode")}
            placeholder="Enter 4 digit postCode"
            className="my-2"
          />

          <p className="text-sm text-red-400 h-4">
            {errors.postCode && errors.postCode.message}
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-4 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            {...register("address")}
            placeholder="Address of your shop (Address should be accurate)"
            className="w-full"
            rows={6}
          />
          {errors.address && (
            <p className="text-sm text-red-400">{errors.address.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAddressForm;
