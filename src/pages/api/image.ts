import openai from "@/lib/openai";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import cloudinary from "@/lib/cloudinary";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    description: string;
    prompt: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (req.method === "POST" && session) {
    const { data } = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: "1024x1024",
    });

    if (!data) throw new Error("Unable to get image");

    const { secure_url } = await cloudinary.uploader.upload(
      data.data[0]?.url as string
    );

    await prisma.icon.create({
      data: {
        image: secure_url,
        description: req.body.description,
        author: { connect: { email: session.user.email as string } },
      },
    });
    res.json(secure_url);
  }
}
