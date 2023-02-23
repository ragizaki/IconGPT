import { type NextPage } from "next";
import Head from "next/head";
import { OpenAIApi, Configuration } from "openai";
import { env } from "@/env.mjs";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

const Generate: NextPage = () => {
  const [generatedImg, setGeneratedImg] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const config = new Configuration({
    apiKey: env.NEXT_PUBLIC_OPEN_AI_KEY,
  });

  const openai = new OpenAIApi(config);

  const generateIcon = async (e: React.MouseEvent) => {
    e.preventDefault();
    const iconPrompt = `a high quality icon of ${prompt} in metallic rainbow iridescent material, 3D render isometric perspective on a dark background, taken on a DSLR camera with a 36x24mm sensor and a 50mm lense`;

    setIsGenerating(true);

    const res = await openai.createImage({
      prompt: iconPrompt,
      n: 1,
      size: "256x256",
    });

    setIsGenerating(false);

    const image = res?.data?.data[0]?.url;

    if (!image) {
      console.log("Error creating your icon");
    } else {
      setGeneratedImg(image);
    }
  };

  return (
    <>
      <Head>
        <title>IconAI - Generate Icon</title>
        <meta
          name="description"
          content="Generate an icon from OpenAI on this page"
        />
      </Head>
      <div className="mt-5 flex flex-col justify-start space-y-8">
        <h2 className="text-4xl">Let&apos;s generate your icon.</h2>
        <div>
          <label className="label">
            Enter a descriptive prompt for your icon
          </label>
          <input
            className="form-input w-full rounded-lg"
            placeholder="an astronaut playing basketball with a cat"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        {session ? (
          <button
            onClick={(e) => void generateIcon(e)}
            className="btn my-3 w-fit"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={() => void signIn("google")}
            className="btn my-3 w-fit"
          >
            Sign in to Generate
          </button>
        )}

        {generatedImg && (
          <img className="h-28 w-28 rounded-lg" src={generatedImg} alt="icon" />
        )}
      </div>
    </>
  );
};

export default Generate;
