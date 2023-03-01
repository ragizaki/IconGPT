import { type ArtStyle } from "@/constants";

const determinePrompt = (
  artStyle: ArtStyle,
  prompt: string,
  color: string
): string => {
  const metallicPrompt = `a high quality icon of ${prompt} in ${color} metallic iridescent material, 3D render isometric perspective on a dark background`;
  const watercolorPrompt = `a watercolor-style icon of ${prompt} colored primarily ${color} on a dark background, with a soft accent and a dreamy feel`;
  const popPrompt = `a pop art-style icon of ${prompt} on a dark background, with bold colors and graphic design elemenst that pop`;

  if (artStyle === "pop") {
    return popPrompt;
  } else if (artStyle === "metallic") {
    return metallicPrompt;
  } else if (artStyle == "watercolor") {
    return watercolorPrompt;
  } else {
    throw new Error("unrecognized art style");
  }
};

export default determinePrompt;
