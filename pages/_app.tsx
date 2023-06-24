import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>Quizzical: Unleash Your Quiz Wizardry!</title>
        <meta
          name="description"
          content="Quizzical: Unleash Your Quiz Wizardry! Create and solve fun quizzes."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
