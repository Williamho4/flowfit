import { createWorkout } from "@/lib/server-utils";
import { BaseExercise } from "@prisma/client";
import { useForm } from "react-hook-form";
import styles from "@/styles/create-workout-form.module.css";
import { UserInfo } from "@/lib/types";

type Inputs = {
  title: string;
  date: Date;
};

type CreateWorkoutFormProps = {
  workout: BaseExercise[] | [];
  setWorkout: React.Dispatch<React.SetStateAction<BaseExercise[] | []>>;
  user: UserInfo;
};

export default function CreateWorkoutForm({
  workout,
  setWorkout,
  user,
}: CreateWorkoutFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();

  const handleAddWorkout = (
    title: string,
    date: Date,
    userId: number,
    workouts: BaseExercise[]
  ) => {
    if (workout.length <= 0) {
      return setError("root", {
        message: "Please add atleast one exercise",
      });
    }
    createWorkout(title, date, userId, workouts);
    reset();
    setWorkout([]);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const { title, date } = data;

        handleAddWorkout(title, date, user.id, workout);
      })}
      className={styles.dashboard__inputs}
    >
      <input
        {...register("title", { required: "This field is required" })}
        placeholder="title"
      />
      <p>{errors.title?.message}</p>
      <input
        {...register("date", { required: "This field is required" })}
        placeholder="date"
        type="date"
      />
      <p>{errors.date?.message}</p>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding workout" : "Add workout"}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
      {isSubmitSuccessful && <p>Workout added successfully</p>}
    </form>
  );
}
