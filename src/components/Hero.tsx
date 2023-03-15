import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-4/5 lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
            Create beautiful icons
            <span className="sm:block"> with the DALL-E-2 API</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-300 sm:text-xl sm:leading-relaxed">
            Generate icons suitable for profile pictures, company logos and much
            more with our simple icon generator!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition ease-out hover:text-white hover:opacity-80 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/create"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
