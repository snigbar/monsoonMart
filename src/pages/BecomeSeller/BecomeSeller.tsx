import Stepper from "@/components/Stepper/Stepper";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ShopInformationForm from "./Forms/ShopInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  TSellerFormSchema,
  sellerFormSchema,
} from "@/Schemas/BecomeSeller.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ShopAddressForm from "./Forms/ShopAddressForm";
import { BillingInformationForm } from "./Forms/BillingInformationForm";
import { cn } from "@/lib/utils";
import {
  BankData,
  bankDataUrl,
  TLocationApiResponse,
} from "./BecomeSeller.interface";
import { useFetchBDLocationsQuery } from "@/store/slices/BecomeSeller/becomeSeller.api";
import { useAppDispatch } from "@/store/hooks/hooks";
import { setLoading } from "@/store/slices/AuthSlice/auth.slice";

const BecomeSeller = () => {
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState(false);
  const [cityInfo, setCityInfo] = useState<null | TLocationApiResponse>(null);
  const [submitted, setSubmitted] = useState(false);
  const [cityInfoUrl, setCityInfoUrl] = useState("");
  const [upazilla, setUpazilla] = useState([""]);
  const [banks, setBanks] = useState<null | BankData[]>(null);
  const { data, isLoading, isSuccess, refetch } =
    useFetchBDLocationsQuery(cityInfoUrl);
  const dispatch = useAppDispatch();

  const formMethods = useForm<TSellerFormSchema>({
    resolver: zodResolver(sellerFormSchema),
    mode: "all",
  });

  // submit function
  const onSubmit = (data: TSellerFormSchema) => {
    // submit data
    // eslint-disable-next-line no-console
    console.log(data);
    setSubmitted(true);
  };

  const handleSetError = () => {
    if (
      formMethods.formState.errors &&
      Object.keys(formMethods.formState.errors).length > 0
    ) {
      setError(true);
      return;
    } else {
      setError(false);
      setStep((prev) => (prev + 1 > 3 ? prev : prev + 1));
    }
  };

  useEffect(() => {
    if (cityInfoUrl.length > 0) {
      refetch();
    } else {
      setCityInfo(null);
    }
  }, [cityInfoUrl]);

  useEffect(() => {
    if (isSuccess) {
      setCityInfo(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  // fetch bank data

  useEffect(() => {
    const fetchBankData = async () => {
      const data = await fetch(bankDataUrl);
      const result = await data.json();
      setBanks(result);
    };
    fetchBankData();
  }, []);

  // handle next
  const handleNext = async (currentStep: number) => {
    if (currentStep === 1) {
      await formMethods.trigger([
        "shopName",
        "phoneNumber",
        "description",
        "productCategories",
        "returnPolicy",
      ]);
      handleSetError();
    } else if (currentStep === 2) {
      await formMethods.trigger([
        "division",
        "city",
        "country",
        "postCode",
        "upazilla",
        "address",
      ]);
      handleSetError();
    } else if (currentStep === 3) {
      await formMethods.trigger([
        "accountNumber",
        "accountTitle",
        "accountType",
        "termsAndConditionsAgreement",
        "branchName",
        "bankName",
        "bankDistrict",
      ]);
      handleSetError();
      if (!error) {
        await formMethods.handleSubmit(onSubmit)();
      }
    } else {
      // await formMethods.trigger();
      handleSetError();
    }
  };

  return (
    <div className="w-full md:w-11/12 lg:w-4/5 mx-auto mt-4 bg-white shadow-md p-4 rounded-md">
      {/* stepper */}
      <Stepper step={step} submitted={submitted}></Stepper>
      <FormProvider {...formMethods}>
        <form className="w-full" onSubmit={formMethods.handleSubmit(onSubmit)}>
          {step === 1 && <ShopInformationForm />}
          {step === 2 && (
            <ShopAddressForm
              cityInfo={cityInfo}
              setUpazilla={setUpazilla}
              setCityInfoUrl={setCityInfoUrl}
              upazilla={upazilla}
              setCityInfo={setCityInfo}
            />
          )}
          {step === 3 && <BillingInformationForm banks={banks} />}
          {/* controll buttons */}
          <div className="flex gap-2 mt-6 justify-between items-center w-full">
            {!submitted && step > 1 && (
              <Button
                variant={"default"}
                onClick={() => {
                  if (
                    !error &&
                    !(Object.keys(formMethods.formState.errors).length > 0)
                  ) {
                    setStep((prev) => (prev - 1 < 1 ? prev : prev - 1));
                  }
                }}
                className="self-start"
                type="button"
              >
                prev
              </Button>
            )}
            <Button
              variant={"default"}
              onClick={() => handleNext(step)}
              className={cn("ml-auto self-end")}
              type="button"
            >
              {step === 3 ? "submit" : "next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default BecomeSeller;
