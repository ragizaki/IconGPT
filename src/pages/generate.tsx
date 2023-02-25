import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

interface ImageResponse {
  imageURL: string;
}

const Generate: NextPage = () => {
  const [generatedImg, setGeneratedImg] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const generateIcon = async (e: React.MouseEvent) => {
    e.preventDefault();
    const iconPrompt = `a high quality icon of ${prompt} in light blue metallic iridescent material, 3D render isometric perspective on a dark background`;

    setIsGenerating(true);
    setGeneratedImg("");

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: iconPrompt }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { imageURL }: ImageResponse = await response.json();
      const result = await fetch("/api/icon", {
        method: "POST",
        body: JSON.stringify({ image: imageURL, description: prompt }),
      });

      setIsGenerating(false);
      setGeneratedImg(imageURL);
      setPrompt("");
      console.log(result);
    } catch (error) {
      console.error(error);
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
            className="form-input mt-2 w-full rounded-lg bg-gray-800 text-white"
            placeholder="an astronaut playing basketball with a cat"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        {session ? (
          <button
            onClick={(e) => void generateIcon(e)}
            className="btn btn-secondary my-3 w-fit"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={() => void signIn("google")}
            className="btn btn-secondary my-3 w-fit"
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
