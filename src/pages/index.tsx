import { type NextPage } from "next";
import Head from "next/head";
import Hero from "@/components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IconAI</title>
        <meta name="description" content="Website to create icons using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
};

export default Home;
