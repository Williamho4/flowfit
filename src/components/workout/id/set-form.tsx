import styles from "@/styles/set-form.module.css";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

type SetFormProps = {
  setId?: number;
  handleEditSet?: (reps: number, weight: number, setId: number) => void;
  handleAddSet?: (reps: number, weight: number) => void;
  setAddSetActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SetForm({
  handleEditSet,
  handleAddSet,
  setAddSetActive,
  setEditActive,
  setId,
}: SetFormProps) {
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  function resetForms() {
    setWeight(0);
    setReps(0);
  }

  return (
    <form
      className={styles["set-form"]}
      onSubmit={(e) => {
        e.preventDefault();
        if (handleEditSet) {
          handleEditSet(reps, weight, setId!);
          resetForms();
        } else if (handleAddSet) {
          handleAddSet(reps, weight);
          resetForms();
        }
      }}
    >
      <div className={styles["input-container"]}>
        <label>reps</label>
        <input
          className={styles["set-form-input"]}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
        />
        <label>weight</label>
        <input
          className={styles["set-form-input"]}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>
      <button type="submit" className={styles["add-button"]}>
        Confirm
      </button>
      <button
        type="button"
        className={styles["close-button"]}
        onClick={() => {
          if (setEditActive) {
            setEditActive(false);
          }
          if (setAddSetActive) {
            setAddSetActive(false);
          }
        }}
      >
        <IoIosClose />
      </button>
    </form>
  );
}
