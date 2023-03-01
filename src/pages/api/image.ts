import { env } from "@/env.mjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import cloudinary from "@/lib/cloudinary";

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

    const { data } = await openai.createImage({
      prompt: req.body.prompt as string,
      n: parseInt(req.body.numIcons as string),
      size: "1024x1024",
    });

    if (!data) throw new Error("Unable to get image");

    const image_urls = [];

    for (const image of data.data) {
      const { secure_url } = await cloudinary.uploader.upload(
        image.url as string
      );

      image_urls.push(secure_url);

      await prisma.icon.create({
        data: {
          image: secure_url,
          description: req.body.description as string,
          author: { connect: { email: session.user.email as string } },
        },
      });
    }

    res.json(image_urls);
  }
}
