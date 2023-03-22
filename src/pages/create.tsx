import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import downloadIcon from "@/lib/downloadIcon";
import { colorOptions, artStyleOptions, type ArtStyle } from "@/constants";
import ColorPicker from "@/components/ColorPicker";
import StylePicker from "@/components/StylePicker";
import determinePrompt from "@/lib/prompt";

const Create: NextPage = () => {
  const [generatedImageURL, setGeneratedImageURL] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [color, setColor] = useState("");
  const [chosenArtStyle, setChosenArtStyle] = useState<ArtStyle>("");
  const { data: session } = useSession();
  const imagesRef = useRef<null | HTMLDivElement>(null);

  console.log(generatedImageURL);
  useEffect(() => {
    imagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [generatedImageURL]);

  const createIcon = async (e: React.MouseEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    setGeneratedImageURL("");

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: determinePrompt(chosenArtStyle, prompt, color),
          description: prompt,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const image_url: string = await response.json();

      setIsGenerating(false);
      setGeneratedImageURL(image_url);
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
        <title>iconGPT - Create Icon</title>
        <meta
          name="description"
          content="Create an icon from OpenAI on this page"
        />
      </Head>
      <div className="mt-5 flex flex-col justify-start space-y-10">
        <h2 className="text-5xl font-semibold">Let&apos;s create your icon.</h2>
        <div>
          <div className="mb-5 flex items-center space-x-4">
            <Image src="/number-1.svg" height={30} width={30} alt="number 1" />
            <h2 className="block text-2xl font-normal">
              Enter a descriptive prompt for your icon
            </h2>
          </div>
          <input
            className="w-full rounded-lg bg-gray-800 py-2.5 px-4 text-white outline-none outline-blue-200 focus:outline-2 focus:outline-blue-500"
            placeholder="an astronaut playing basketball with a cat"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-5 flex items-center space-x-4">
            <Image src="/number-2.svg" height={30} width={30} alt="number 2" />
            <h2 className="block text-2xl font-normal">
              Choose the main colour for your icon
            </h2>
          </div>
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
          <div className="mb-5 flex items-center space-x-4">
            <Image src="/number-3.svg" height={30} width={30} alt="number 3" />
            <h2 className="block text-2xl font-normal">
              Choose an art style for your icon
            </h2>
          </div>
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
        {session ? (
          <button
            onClick={(e) => void createIcon(e)}
            className="btn btn-secondary my-3 w-fit disabled:pointer-events-none disabled:opacity-40"
            disabled={isGenerating || !prompt || !color || !chosenArtStyle}
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
        {generatedImageURL && (
          <div>
            <h2 className="mb-5 text-2xl font-normal">Your Generated Icon</h2>
            <div className="relative w-fit" ref={imagesRef}>
              <Image
                src={generatedImageURL}
                alt="icon"
                height={80}
                width={80}
                className="h-40 w-40 rounded-lg"
              />
              <svg
                onClick={() => void downloadIcon(generatedImageURL, prompt)}
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
          </div>
        )}
      </div>
    </>
  );
};

export default Create;
