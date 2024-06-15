"use client";
import { useGetQuotesQuery } from "@/lib/features/quotes/quotesApiSlice";
import { useState } from "react";
import styles from "./LoginPage.module.css";

const options = [5, 10, 20, 30];

export const Login = () => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10);
  const { data, isError, isLoading, isSuccess } =
    useGetQuotesQuery(numberOfQuotes);

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.imagecontainer}>
            <div className={styles.image}>
            <img src="/MyEasyPharmaLogo.png" alt="Meditation" className={styles.image} />
            </div>
        </div>
      </div>
    );
  }

  return null;
};
