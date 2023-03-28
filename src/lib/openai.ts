import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  apiKey: env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
