"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className={"btn btn-primary"} onClick={handleLogout}>
      Logout
    </button>
  );
}
