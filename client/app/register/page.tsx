"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      birthday,
      email,
      password,
    };

    try {
      await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
    }

    setName("");
    setBirthday("");
    setEmail("");
    setPassword("");
  };

  return (
    <main className={styles.wrapper}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles["form-wrapper"]}>
        <label htmlFor="name">Full Name</label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="birthday">Birthday</label>
        <input
          required
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
