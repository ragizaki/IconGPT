import { type NextPage, GetServerSidePropsContext } from "next";
import { type Icon } from "@prisma/client";
import IconsGrid from "@/components/IconGrid";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

interface Props {
  icons: Icon[];
}

const UserIcons: NextPage<Props> = ({ icons }) => {
  return (
    <main>
      <h1 className="mb-10 text-4xl font-semibold">Your Icons</h1>
      <IconsGrid icons={icons} />
    </main>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const icons = await prisma.icon.findMany({
    where: {
      author: {
        email: session?.user.email,
      },
    },
  });

  return {
    props: {
      icons,
    },
  };
};

export default UserIcons;
