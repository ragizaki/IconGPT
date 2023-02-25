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
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {icons.map(({ id, image, description }) => (
            <img
              className="rounded-lg shadow-lg"
              key={id}
              src={image}
              alt={description}
            />
          ))}
        </section>
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
