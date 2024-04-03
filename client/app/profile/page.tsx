"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./page.module.css";
import Delete from "./../../components/Delete";

interface Profile {
  id: number;
  name: string;
  birthday: string;
  email: string;
}

export default function ProfilePage() {
  const [data, setData] = useState<Profile | null>(null);

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
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const parsedDate = data?.birthday ? new Date(data.birthday) : null;
  const readableDate = parsedDate?.toLocaleDateString("en-US");

  return (
    <main className={styles.wrapper}>
      <h1>Story About You</h1>
      <p>
        Your name is <strong>{data?.name}</strong>, you were born in{" "}
        <strong>{readableDate}</strong> and somehow decided to have an email
        with this address: <strong>{data?.email}</strong>.
        <br />
        <br />
        And that is a short story about yourself, a very short one it is.
      </p>
      <hr />
      <Link
        href={"/update"}
        className={`btn btn-secondary ${styles["additional-style"]}`}
      >
        Update Profile
      </Link>
      <Delete />
    </main>
  );
}
