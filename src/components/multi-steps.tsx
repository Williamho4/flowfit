type MultiStepsProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function MultiSteps({ step, setStep }: MultiStepsProps) {
  const handlePrev = () => {
    if (step > 1) {
      setStep((step) => step - 1);
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep((step) => step + 1);
    }
  };

  return (
    <div>
      {step == 1 ? (
        <button onClick={handleNext}>Next</button>
      ) : (
        <button onClick={handlePrev}>Prev</button>
      )}
    </div>
  );
}
