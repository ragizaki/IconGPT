import { type Icon as PrismaIcon } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import downloadIcon from "@/lib/downloadIcon";

interface Props {
  icon: PrismaIcon;
}

const Icon = ({ icon }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevOpen) => !prevOpen);

  return (
    <div key={icon.id} className="relative">
      <Image
        width={80}
        height={80}
        className="w-full rounded-2xl shadow-lg"
        src={icon.image}
        alt={icon.description}
      />
      <svg
        viewBox="0 0 21 21"
        fill="currentColor"
        className="absolute right-1 top-1 h-6 w-6 cursor-pointer transition ease-out hover:opacity-80"
        onClick={toggleDropdown}
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 6.5h12M4.498 10.5h11.997M4.5 14.5h11.995" />
        </g>
      </svg>
      {dropdownOpen && (
        <div
          id="dropdown"
          className="absolute left-32 top-10 z-10 w-40 divide-y divide-gray-100 rounded-lg bg-gray-700"
        >
          <ul
            className="py-2 text-sm transition-all ease-linear"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="flex cursor-pointer items-center space-x-2 px-4 py-2 hover:bg-gray-600"
              onClick={() => {
                void downloadIcon(icon.image, icon.description);
                toggleDropdown();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-base">Download</p>
            </li>
            <li className="flex cursor-pointer items-center space-x-2 px-4 py-2 hover:bg-gray-600">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z" />
              </svg>
              <p className="text-base">Edit Icon</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Icon;
