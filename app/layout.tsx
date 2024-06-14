import { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider"; // Adjust the import path if necessary
import Head from "next/head";
import styles from "./styles/layout.module.css"; // Adjust the import path if necessary
import UsernameCard from "./components/UsernameCard"; // Adjust the import path if necessary

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <Head>
        <title>Dashboard Overview</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lufga:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <html>
        <body>
          <div className={styles.container}>
            <main className={styles.main}>
              <div className={styles.dashstart}>
              <header className={styles.header}>
                <h1 className={styles.headerTitle}>Dashboard Overview</h1>
              </header>
              <section className={styles.dashboard}>
                <UsernameCard
                  name="Manan Jain"
                  message="Have a nice day and don’t forget to take care of your health!"
                />

              </section>
              </div>
            </main>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
