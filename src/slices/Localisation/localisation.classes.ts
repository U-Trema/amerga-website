import {cva} from "class-variance-authority";

export const localisation = {
  root: cva([`
    grid grid-cols-1 grid-rows-1 gap-32 md:grid-cols-12
    bg-amerga-blue md:rounded-xl px-16 py-64 md:px-48 md:py-48
    lg:py-80 lg:!px-80`
  ]),
  title: cva(['text-white text-6xl font-bold font-display-fira']),
  address: cva(['text-white mt-16 !leading-[2rem]']),
  image: cva(['block w-full h-full object-cover aspect-square'])
}
