import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";

import styles from "./styles.module.css";
import Logout from "./../Logout";

export default function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <header className={styles.wrapper}>
      <div>
        <Link href={"/"}>
          <Image src="/logo.png" width={48} height={48} alt="" />
        </Link>
      </div>
      <div>
        {token ? (
          <div className={styles["menu-wrapper"]}>
            <Link href={"/profile"} className={"btn btn-secondary"}>
              Profile
            </Link>
            <Logout />
          </div>
        ) : (
          <div className={styles["menu-wrapper"]}>
            <Link href={"/register"} className={"btn btn-secondary"}>
              Register
            </Link>
            <Link href={"/login"} className={"btn btn-primary"}>
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
