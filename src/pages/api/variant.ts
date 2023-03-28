import openai from "@/lib/openai";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import cloudinary from "@/lib/cloudinary";
import { createReadStream } from "fs";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    image: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (req.method === "POST" && session) {
    const res = await openai.createImageVariation(
      createReadStream(req.body.image) as any,
      1,
      "1024x1024"
    );
    console.log(res);

    // if (!data) throw new Error("Unable to get image");

    // await prisma.icon.create({
    //   data: {
    //     image: secure_url,
    //     description: req.body.description,
    //     author: { connect: { email: session.user.email as string } },
    //   },
    // });
    // res.json(file);
    res.end();
  }
}
