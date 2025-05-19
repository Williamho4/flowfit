"use client";

import { createUser } from "@/lib/server-utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "@/styles/login-form.module.css";
import Link from "next/link";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();

  const router = useRouter();

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(async (data) => {
        const { username, email, password } = data;
        const user = await createUser(username, email, password);
        if (user) {
          router.push("/");
        }
      })}
    >
      <h1>Sign Up</h1>
      <input
        {...register("username", { required: "This field is required" })}
        placeholder="username"
        spellCheck="false"
        className={styles["input"]}
      />
      <p>{errors.username?.message}</p>
      <input
        {...register("email", { required: "This field is required" })}
        placeholder="email"
        spellCheck="false"
        className={styles["input"]}
      />
      <p>{errors.email?.message}</p>
      <input
        {...register("password", {
          required: "This field is required",
          minLength: {
            value: 4,
            message: "Minimum length is 4",
          },
        })}
        placeholder="password"
        type="password"
        spellCheck="false"
        className={styles["input"]}
      />
      <p>{errors.password?.message}</p>
      <div className={styles["button-container"]}>
        <Link href="/login">Login</Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles["login-button"]}
        >
          {isSubmitting ? "Registering" : "Sign Up"}
        </button>
      </div>
      {isSubmitSuccessful && <p>Signed up successfully</p>}
    </form>
  );
}
