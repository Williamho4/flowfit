import { InputSet } from '@/lib/types'

type MultiStepsProps = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  totalSets: InputSet[] | []
}

export default function MultiSteps({
  step,
  setStep,
  totalSets,
  setError,
}: MultiStepsProps) {
  const handlePrev = () => {
    if (step > 1) {
      setStep((step) => step - 1)
    }
  }

  const handleNext = () => {
    setError(null)

    if (totalSets.length <= 0) {
      return setError('You need atleast one set')
    }

    if (step < 2) {
      setStep((step) => step + 1)
    }
  }

  return (
    <div>
      {step == 1 && <button onClick={handleNext}>Next</button>}
      {step == 2 && <button onClick={handlePrev}>Back</button>}
    </div>
  )
}
