import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";

interface StepperProps {
  step: number;
  submitted: boolean;
}

const rootStyle =
  "p-2 border border-gray-400 w-8 h-8 flex justify-center items-center bg-white shadow-sm rounded-full font-medium";

const Stepper = ({ step, submitted }: StepperProps) => {
  return (
    <>
      {/* steps */}
      <div className="w-full relative z-20">
        <div className="flex justify-between items-center z-20">
          {/* step 1 */}
          <div
            className={cn(rootStyle, {
              "bg-primary text-white border-none": step >= 1,
            })}
          >
            <p className="mt-1">
              {step === 1 ? (
                1
              ) : (
                <CheckIcon className="text-white stroke-white" />
              )}
            </p>
          </div>
          {/* step 2 */}
          <div
            className={cn(rootStyle, {
              "bg-primary text-white border-none": step > 1,
            })}
          >
            <p className="mt-1">
              {step > 2 ? <CheckIcon className="text-white stroke-white" /> : 2}
            </p>
          </div>
          {/* step 3 */}
          <div
            className={cn(rootStyle, {
              "bg-primary text-white border-none": step > 2,
            })}
          >
            <p className="mt-1">
              {submitted ? (
                <CheckIcon className="text-white stroke-white" />
              ) : (
                3
              )}
            </p>
          </div>
        </div>
        {/* step line */}
        <div className="absolute w-[97%] overflow-hidden rounded-full bg-secondary bottom-[40%] left-[2%] -z-10">
          <div
            className={cn(
              "h-1 w-full bg-primary translate-x-[-100%] transition duration-300",
              {
                "translate-x-[-50%]": step === 2,
                "translate-x-[-0%]": step === 3,
              },
            )}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
