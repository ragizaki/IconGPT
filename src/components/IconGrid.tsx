import { type Icon } from "@prisma/client";
import Image from "next/image";

interface Props {
  icons: Icon[];
}

const IconsGrid: React.FC<Props> = ({ icons }) => {
  return (
    <section className="grid grid-cols-2 gap-4 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {icons.map(({ id, image, description }) => (
        <Image
          width={80}
          height={80}
          className="w-full rounded-2xl shadow-lg"
          key={id}
          src={image}
          alt={description}
        />
      ))}
    </section>
  );
};

export default IconsGrid;
