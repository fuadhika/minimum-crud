"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <main className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles["form-wrapper"]}>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
