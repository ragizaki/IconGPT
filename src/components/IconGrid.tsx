import { type Icon } from "@prisma/client";
import Image from "next/image";
import downloadIcon from "@/lib/downloadIcon";

interface Props {
  icons: Icon[];
}

const IconsGrid: React.FC<Props> = ({ icons }) => {
  return (
    <section className="grid grid-cols-2 gap-4 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {icons.map(({ id, image, description }) => (
        <div key={id} className="relative">
          <Image
            width={80}
            height={80}
            className="w-full rounded-2xl shadow-lg"
            src={image}
            alt={description}
          />
          <svg
            onClick={() => void downloadIcon(image, description)}
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
    </section>
  );
};

export default IconsGrid;
