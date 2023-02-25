import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";

interface RequestBody {
  image: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerAuthSession({ req, res });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: RequestBody = JSON.parse(req.body as string);
    if (session) {
      const result = await prisma.icon.create({
        data: {
          image: body.image,
          description: body.description,
          author: { connect: { email: session.user.email as string } },
        },
      });
      res.json(result);
    }
  }
}
