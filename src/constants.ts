export const colorOptions = [
  "red",
  "blue",
  "green",
  "indigo",
  "purple",
  "orange",
  "pink",
  "white",
  "black",
  "lime",
];

interface ArtStyleOption {
  artStyle: ArtStyle;
  imageSource: string;
}

export const artStyleOptions: ArtStyleOption[] = [
  {
    artStyle: "pop",
    imageSource: "/pop-art-style.webp",
  },
  {
    artStyle: "metallic",
    imageSource: "/metallic-art-style.webp",
  },
  {
    artStyle: "watercolor",
    imageSource: "/watercolor-art-style.webp",
  },
];

export type ArtStyle = "pop" | "watercolor" | "metallic" | "";
