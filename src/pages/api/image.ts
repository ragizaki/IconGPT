import { env } from "@/env.mjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: "256x256",
    });

    if (!response.data) throw new Error("Unable to get image");

    res.status(200).json({ imageURL: response?.data?.data[0]?.url });
  }
}
