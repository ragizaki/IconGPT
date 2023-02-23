import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IconAI</title>
        <meta name="description" content="Website to generate icons using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Hello</h1>
      </div>
    </>
  );
};

export default Home;
