import { env } from "@/env.mjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

const configuration = new Configuration({
  apiKey: env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (req.method === "POST" && session) {
    const openai = new OpenAIApi(configuration);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    const { data } = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: "1024x1024",
    });

    if (!data) throw new Error("Unable to get image");

    const imageURL = data.data[0]?.url;

    const result = await prisma.icon.create({
      data: {
        image: imageURL as string,
        description: req.body.description,
        author: { connect: { email: session.user.email as string } },
      },
    });
    res.json({ result, imageURL });
  }
}
