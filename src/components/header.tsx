import styles from "@/styles/header.module.css";
import Link from "next/link";
import LogOutButton from "./buttons/log-out-button";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">FlowFit</Link>
      <Link href="/workout/add">Workout Planner</Link>
      <LogOutButton />
    </header>
  );
}
