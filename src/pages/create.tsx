import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { saveAs } from "file-saver";
import { colorOptions, artStyleOptions, type ArtStyle } from "@/constants";
import ColorPicker from "@/components/ColorPicker";
import Alert from "@/components/Alert";
import { useTokenContext } from "@/context/tokens";
import StylePicker from "@/components/StylePicker";
import determinePrompt from "@/lib/prompt";

const Create: NextPage = () => {
  const [generatedImageURLS, setGeneratedImageURLS] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [color, setColor] = useState("");
  const [chosenArtStyle, setChosenArtStyle] = useState<ArtStyle>("");
  const [numIcons, setNumIcons] = useState(1);
  const [error, setError] = useState(false);
  const { data: session } = useSession();
  const { remainingTokens, setRemainingTokens } = useTokenContext();
  const imagesRef = useRef<null | HTMLDivElement>(null);

  const downloadIcon = (generatedImg: string) => {
    saveAs(generatedImg, "icon.png");
  };

  useEffect(() => {
    imagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [generatedImageURLS]);

  const createIcon = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (numIcons > remainingTokens) {
      setError(true);
      return;
    }

    setIsGenerating(true);
    setGeneratedImageURLS([]);

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: determinePrompt(chosenArtStyle, prompt, color),
          description: prompt,
          numIcons,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const image_urls: string[] = await response.json();

      const res = await fetch("/api/tokens", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numTokens: numIcons }),
      });
      const tokens: number = (await res.json()) as number;
      setRemainingTokens(tokens);

      setIsGenerating(false);
      setGeneratedImageURLS(image_urls);
      setPrompt("");
      setColor("");
      setChosenArtStyle("");
    } catch (error) {
      setIsGenerating(false);
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
      <div className="mt-5 flex flex-col justify-start space-y-10">
        {error && <Alert>Not enough tokens to generate an image.</Alert>}
        <h2 className="text-4xl font-semibold">Let&apos;s create your icon.</h2>
        <div>
          <h2 className="mb-5 block text-2xl font-normal">
            Enter a descriptive prompt for your icon
          </h2>
          <input
            className="w-full rounded-lg bg-gray-800 py-2.5 px-4 text-white outline-none outline-blue-200 focus:outline-2 focus:outline-blue-500"
            placeholder="an astronaut playing basketball with a cat"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div>
          <h2 className="mb-5 block text-2xl font-normal">
            Choose the main color for your icon
          </h2>
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {colorOptions.map((option) => (
              <ColorPicker
                key={option}
                option={option}
                color={color}
                setColor={setColor}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-5 block text-2xl font-normal">
            Choose an art style for your icon
          </h2>
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {artStyleOptions.map(({ artStyle, imageSource }) => (
              <StylePicker
                key={artStyle}
                imageSource={imageSource}
                artStyle={artStyle}
                chosenArtStyle={chosenArtStyle}
                setChosenArtStyle={setChosenArtStyle}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-5 block text-2xl font-normal">
            Choose the number of icons to generate (1 token per icon)
          </h2>
          <input
            type="number"
            className="w-1/2 rounded-lg bg-gray-800 py-2.5 px-4 text-white outline-none outline-blue-200 focus:outline-2 focus:outline-blue-500"
            value={numIcons}
            onChange={(e) => setNumIcons(e.target.value)}
          />
        </div>
        {session ? (
          <button
            onClick={(e) => void createIcon(e)}
            className="btn btn-secondary my-3 w-fit"
            disabled={isGenerating || !prompt || !color}
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

        {/* Generated Images */}
        {generatedImageURLS.length > 0 && (
          <div>
            <h2 className="mb-5 text-2xl font-normal">Your Generated Icons</h2>
            <div className="flex gap-8" ref={imagesRef}>
              {generatedImageURLS.map((image_url) => (
                <div key={image_url} className="relative w-fit">
                  <Image
                    src={image_url}
                    alt="icon"
                    height={80}
                    width={80}
                    className="h-40 w-40 rounded-lg"
                  />
                  <svg
                    onClick={() => downloadIcon(image_url)}
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
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Create;
