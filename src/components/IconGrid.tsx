import { type Icon } from "@prisma/client";

interface Props {
  icons: Icon[];
}

const IconsGrid: React.FC<Props> = ({ icons }) => {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {icons.map(({ id, image, description }) => (
        <img
          className="rounded-lg shadow-lg"
          key={id}
          src={image}
          alt={description}
        />
      ))}
    </section>
  );
};

export default IconsGrid;
