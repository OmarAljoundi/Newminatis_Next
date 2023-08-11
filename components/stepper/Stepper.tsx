import { FC, Fragment, useEffect, useState } from "react";
import { FlexRowCenter } from "../flex-box";
import { classNames } from "@/helpers/Extensions";

// ========================================================
export type Step = { title: string; disabled: boolean };
type StepperProps = {
  stepperList: Step[];
  selectedStep: number;
  onChange: (step: number) => void;
};
// ========================================================

const Stepper: FC<StepperProps> = ({
  selectedStep = 1,
  stepperList,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedStep - 1);

  const handleStepClick = (step: Step, ind: number) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(ind);
    }
  };

  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexRowCenter flexWrap="wrap" my="-4px">
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <button
            disabled={step.disabled}
            onClick={handleStepClick(step, ind)}
            className={classNames(
              `${
                ind <= selected
                  ? "bg-black text-white"
                  : "bg-gray-500 text-white"
              }`,
              "px-1 py-2 font-semibold my-1 rounded-none w-32"
            )}
          >
            {step.title}
          </button>
          {ind < stepperList.length - 1 && (
            <div
              style={{ width: "40px", height: "3px" }}
              className={`${ind < selected ? "bg-black" : "bg-gray-300"}`}
            />
          )}
        </Fragment>
      ))}
    </FlexRowCenter>
  );
};

export default Stepper;
