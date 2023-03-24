import { type Icon as PrismaIcon } from "@prisma/client";
import Icon from "./Icon";

interface Props {
  icons: PrismaIcon[];
}

const IconsGrid: React.FC<Props> = ({ icons }) => {
  return (
    <section className="grid grid-cols-1 gap-4 pb-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {icons.map((icon) => (
        <Icon icon={icon} key={icon.userId} />
      ))}
    </section>
  );
};

export default IconsGrid;
