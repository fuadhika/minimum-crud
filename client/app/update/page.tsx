"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";

export default function UpdatePage() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  const data = { name, birthday, email };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/users/profile",
          {
            credentials: "include",
          }
        );
        const result = await response.json();

        setName(result.data.name);
        setBirthday(new Date(result.data.birthday).toISOString().slice(0, 10));
        setEmail(result.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8080/api/v1/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }

    setName("");
    setBirthday("");
    setEmail("");
  };

  return (
    <main className={styles.wrapper}>
      <h1>Update</h1>
      <form onSubmit={handleSubmit} className={styles["form-wrapper"]}>
        <label htmlFor="name">Name</label>
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
        <button type="submit">Update</button>
      </form>
    </main>
  );
}
