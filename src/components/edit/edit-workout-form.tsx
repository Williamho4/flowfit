import { editWorkout } from "@/lib/workout-server-utils";
import { BaseExercise } from "@prisma/client";
import { useForm } from "react-hook-form";
import styles from "@/styles/create-workout-form.module.css";
import { Exercise, UserInfo } from "@/lib/types";
import { useEffect } from "react";

type Inputs = {
  title: string;
  date: Date | string;
};

type EditWorkoutFormProps = {
  workoutId: number;
  workoutTitle: string;
  workoutDate: Date;
  workout: (BaseExercise | Exercise)[] | [];
  setWorkout: React.Dispatch<
    React.SetStateAction<(BaseExercise | Exercise)[] | []>
  >;
  user: UserInfo;
};

export default function EditWorkoutForm({
  workout,
  setWorkout,
  user,
  workoutId,
  workoutTitle,
  workoutDate,
}: EditWorkoutFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();

  useEffect(() => {
    setValue("title", workoutTitle);
    setValue("date", workoutDate.toISOString().split("T")[0]);
  }, [workoutTitle, workoutDate, setValue]);

  const handleEditWorkout = async (
    title: string,
    date: Date,
    userId: number,
    workoutId: number,
    oldExercises: Exercise[],
    newExercises: BaseExercise[]
  ) => {
    if (workout.length <= 0) {
      return setError("root", {
        message: "Please add atleast one exercise",
      });
    }
    await editWorkout(
      userId,
      workoutId,
      title,
      new Date(date),
      oldExercises,
      newExercises
    );
    reset();
    setWorkout([]);
  };

  return (
    <section className={styles.container}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const { title, date } = data;

          const oldExercises = workout.filter(
            (exercise): exercise is Exercise => "workoutId" in exercise
          );

          const newExercises = workout.filter(
            (exercise): exercise is BaseExercise => !("workoutId" in exercise)
          );

          handleEditWorkout(
            title,
            new Date(date),
            user.id,
            workoutId,
            oldExercises as Exercise[],
            newExercises as BaseExercise[]
          );
        })}
        className={styles.dashboard__inputs}
      >
        <input
          {...register("title", { required: "This field is required" })}
          className={styles["title-input"]}
          placeholder="Title"
          spellCheck="false"
        />
        <p>{errors.title?.message}</p>
        <input
          {...register("date", { required: "This field is required" })}
          className={styles["date-input"]}
          placeholder="Date"
          type="date"
        />
        <p>{errors.date?.message}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles["add-button"]}
        >
          {isSubmitting ? "Loading" : "Edit workout"}
        </button>
        {errors.root && <p>{errors.root.message}</p>}
        {isSubmitSuccessful && <p>Workout edited successfully</p>}
      </form>
    </section>
  );
}
