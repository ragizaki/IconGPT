import { type Dispatch, type SetStateAction } from "react";
import { type ArtStyle } from "@/constants";
import Image from "next/image";

interface Props {
  imageSource: string;
  artStyle: ArtStyle;
  chosenArtStyle: ArtStyle;
  setChosenArtStyle: Dispatch<SetStateAction<ArtStyle>>;
}
const StylePicker: React.FC<Props> = ({
  imageSource,
  artStyle,
  chosenArtStyle,
  setChosenArtStyle,
}) => {
  return (
    <div className="flex items-center">
      <label className="flex flex-col gap-y-3 text-center">
        <input
          type="radio"
          className="peer absolute h-28 w-28 opacity-0"
          name="art-style"
          checked={artStyle === chosenArtStyle}
          value={artStyle}
          onChange={(e) => setChosenArtStyle(e.target.value as ArtStyle)}
        />
        <Image
          src={imageSource}
          width={100}
          height={100}
          alt={artStyle}
          className="z-20 h-36 w-36 cursor-pointer rounded-xl opacity-40 peer-checked:scale-110 peer-checked:opacity-100"
        />
        <p>{artStyle}</p>
      </label>
    </div>
  );
};

export default StylePicker;
