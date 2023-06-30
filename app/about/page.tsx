import { SpecialIcons } from "@/components/SpecialIcons";
import Globe from "@/components/icons/Globe";
import GreenGlobe from "@/components/icons/GreenGlobe";
import ValueSection from "@/pages-sections/home/ValueSection";
import React from "react";

export default function AboutPage() {
  return (
    <article>
      <div className="px-4 md:px-16 md:py-16 py-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <p className="mb-6 text-left md:text-center font-bold text-2xl lg:text-4xl">
              About us
            </p>
            <div className="w-auto text-base lg:text-xl font-medium">
              <span className="bg-gray-400 rounded-2xl px-2 text-white">
                NEWMINATIS
              </span>{" "}
              is a fashion brand merging high fashion with futuristic elements
              to represent a global culture promoting a natural state of the
              soul. The brand transcends fashion, inspiring creativity,
              inclusivity, and individuality through alternative and
              deconstructed designs. Utilizing high-tech materials,{" "}
              <span className="bg-gray-400 rounded-2xl px-2 text-white">
                NEWMINATIS
              </span>{" "}
              unites fashion, art, music, and people, encouraging individuals to
              embrace their true selves and celebrate their uniqueness.
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-4 text-lg md:text-xl font-bold">
              NEWMINATIS stands for 3 main pillars:
            </div>
            <div className="mb-4 flex items-center relative">
              <div className="w-[3px] bg-gray-500 absolute top-0 bottom-0 left-0 right-auto"></div>
              <div className="text-base ml-4 font-medium">
                <span className="font-extrabold">Radical self-expression:</span>
                the idea of expressing oneself authentically and creatively,
                without fear of judgment or criticism from others. It encourages
                you to push past your comfort zone and explore your true
                identity through various forms of art, fashion, music, and other
                creative outlets.
              </div>
            </div>
            <div className="mb-4 flex items-center relative">
              <div className="w-[3px] bg-gray-500 absolute top-0 bottom-0 left-0 right-auto"></div>
              <div className="text-base ml-4 font-medium">
                <span className="font-extrabold">Deconstructed fashion:</span> a
                style of fashion where the traditional structure and
                construction of clothing is intentionally altered or undone.
                This style of fashion aims to challenge traditional notions of
                what clothing should look like and how it should be constructed.
              </div>
            </div>
            <div className="mb-4 flex items-center relative">
              <div className="w-[3px] bg-gray-500 absolute top-0 bottom-0 left-0 right-auto"></div>
              <div className="text-base ml-4 font-medium">
                <span className="font-extrabold">Community:</span> as an
                avant-garde community, Newminatis defies conventional norms and
                pushes the limits of fashion by embracing creativity,
                innovation, and individuality. Through experimentation with
                diverse materials and techniques, we redefine the fashion
                landscape, nurturing a vibrant and supportive avant-garde
                community.
              </div>
            </div>
          </div>
          <div className="my-10 lg:my-20 relative">
            <div className="absolute right-2 lg:right-0 top-0 -m-5 globe_rotate">
              <GreenGlobe />
            </div>
            <div className="border-4 border-gray-600 shadow-md shadow-gray-600 p-5 md:p-10">
              <div className="font-semibold">
                <p className="text-sm md:text-lg text-center">
                  At NEWMINATIS, we prioritize environmental sustainability and
                  are committed to counteracting climate change.{" "}
                </p>
                <p className="text-sm md:text-lg  text-center">
                  A part of our revenue goes towards initiatives that remove
                  carbon dioxide from the atmosphere, and we strive to promote
                  sustainable practices within the industry.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-10 text-left md:text-center font-bold text-2xl lg:text-4xl">
              Our Key Values
            </p>
            <ValueSection mode="light" />
          </div>
        </div>
      </div>
    </article>
  );
}
