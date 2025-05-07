import { Set } from "@/lib/types";

type ExerciseCardBackProps = {
  sets: Set[];
};

export default function ExerciseCardBack({ sets }: ExerciseCardBackProps) {
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
          <label>How many sets</label>
          <input type="number" />
        </>
      )}
    </div>
  );
}
