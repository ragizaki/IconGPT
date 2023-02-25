import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { saveAs } from "file-saver";

interface ImageResponse {
  imageURL: string;
}

const Create: NextPage = () => {
  const [generatedImg, setGeneratedImg] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const downloadIcon = () => {
    saveAs(generatedImg, "icon.png");
  };

  const createIcon = async (e: React.MouseEvent) => {
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
        <title>IconAI - Create Icon</title>
        <meta
          name="description"
          content="Create an icon from OpenAI on this page"
        />
      </Head>
      <div className="mt-5 flex flex-col justify-start space-y-8">
        <h2 className="text-4xl font-semibold">Let&apos;s create your icon.</h2>
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
            onClick={(e) => void createIcon(e)}
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
            Sign in to Create
          </button>
        )}

        {generatedImg && (
          <div className="relative w-fit">
            <Image
              src={generatedImg}
              alt="icon"
              height={80}
              width={80}
              className="h-28 w-28 rounded-lg"
            />
            <svg
              onClick={downloadIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute right-1 top-1 h-6 w-6 cursor-pointer transition ease-out hover:opacity-80"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default Create;
