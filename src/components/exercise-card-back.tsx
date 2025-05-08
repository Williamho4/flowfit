"use client";

import { useState } from "react";
import MultiSteps from "./multi-steps";
import { InputSet, Set } from "@/lib/types";
import styles from "@/styles/exercise-card-back.module.css";

type ExerciseCardBackProps = {
  sets: Set[] | undefined;
};

export default function ExerciseCardBack({ sets }: ExerciseCardBackProps) {
  const [step, setStep] = useState(1);
  const [totalSets, setTotalSets] = useState<InputSet[] | []>([]);

  

  }

  return (
    <div>
      {sets?.length ? (
        <>
          {sets.map((set, index) => (
            <div key={set.id}>
              <label>Set {index + 1}</label>
              <input type="number" placeholder={set.reps.toString()} />
            </div>
          ))}
          <button>Confirm</button>
        </>
      ) : (
        <>
          {step === 1 ? (
            <>
              <label>How many sets</label>
              <input
                min="1"
                max="5"
                type="number"
                onChange={(e) => {
                  const count = Math.min(Number(e.target.value || "0"), 5);
                  const newSets = Array.from({ length: count }, () => ({
                    reps: 0,
                    weight: 0,
                  }));
                  setTotalSets(newSets);
                }}
              />
            </>
          ) : (
            <>
              {totalSets.map((set, index) => (
                <div key={index} className={styles.sets}>
                  <label>Set {index + 1}</label>
                  <input type="number" placeholder={`Set ${index + 1}`} />
                  <label>Weight</label>
                  <input type="number" placeholder="Weight" />
                </div>
              ))}
              <button>Confirm</button>
            </>
          )}
          <MultiSteps step={step} setStep={setStep}/>
        </>
      )}
    </div>
  );
}
