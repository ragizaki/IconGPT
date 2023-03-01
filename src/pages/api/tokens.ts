import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });

    res.json(user?.tokens);
  } else if (req.method === "PATCH") {
    const { tokens } = await prisma.user.update({
      where: {
        email: session?.user.email as string,
      },
      data: {
        tokens: {
          decrement: parseInt(req.body.numTokens as number),
        },
      },
    });
    res.json(tokens);
  }
}
