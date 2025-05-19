import Image from "next/image";
import Link from "next/link";
import logo from "@/app/favicon.ico";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image src={logo} alt="logo" width={30} height={30} />
    </Link>
  );
}
