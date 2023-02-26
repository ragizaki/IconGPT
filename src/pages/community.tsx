import IconsGrid from "@/components/IconGrid";
import { prisma } from "@/server/db";
import { type Icon } from "@prisma/client";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";

interface Props {
  icons: Icon[];
}

const Community: NextPage<Props> = ({ icons }) => {
  return (
    <>
      <Head>
        <title>IconAI - Community Icons</title>
        <meta
          name="description"
          content="Browse the community's created icons"
        />
      </Head>
      <main>
        <h1 className="mb-10 text-4xl font-semibold">
          Check out the Community Icons
        </h1>
        <IconsGrid icons={icons} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const icons = await prisma.icon.findMany();
  return {
    props: { icons },
  };
};

export default Community;
