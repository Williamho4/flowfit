"use client";

import styles from "@/styles/header.module.css";
import Link from "next/link";
import { deleteSession } from "@/lib/session";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { removeSession } from "@/lib/features/session/sessionSlice";
import { FaUser } from "react-icons/fa";
import Logo from "./ui/logo";
import { CiLogout } from "react-icons/ci";

export default function Header() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session.session);

  return (
    <header className={styles.header}>
      <Logo />
      {session ? (
        <>
          <Link href="/workout/add" className={styles.link}>
            Workout Planner
          </Link>
          <div className={styles.user}>
            <FaUser />
            <p className={styles.user__username}>{session.username}</p>
          </div>
          <button
            className={styles.logout}
            onClick={() => {
              deleteSession();
              dispatch(removeSession());
              localStorage.removeItem("chosenExercises");
            }}
          >
            <CiLogout />
          </button>
        </>
      ) : (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      )}
    </header>
  );
}
