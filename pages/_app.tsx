import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>NextJS App</title>
        <meta
          name="description"
          content="This is a NextJs + TS + TailwindCSS starter app."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
