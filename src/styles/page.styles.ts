import {cva} from "class-variance-authority";

export const homePageCVA = {
  root: cva(['!px-(--spacing-md) lg:px-[0] max-w-[1280px] mx-auto'])
}

export const contactPageCVA = {
  root: cva(['w-full m-auto !max-w-(--spacing-container) !px-(--spacing-md) lg:px-[0] max-w-[1280px] mx-auto']),
  hero: cva(['w-full pt-[13rem] mt-[-10rem]']),
  title: cva(['mb-5 !text-[56px] !leading-[56px]']),
  bg: cva(['w-full bg-white']),
  info: cva(['text-[18px]']),
}

export const nousConnaitrePageCVA = {
  hero: cva(['relative bg-soft-black pb-24 pt-32 text-white xs:py-44 md:py-72 mt-[-7rem]']),
  heroImageContainer: cva(['']),
  heroImage: cva(['absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center']),
  heroImageFilter: cva(['h-full w-full absolute inset-0 bg-black opacity-50 top-0 w-full h-auto']),
  title: cva(['mx-3 xs:mx-4 relative z-10 text-center flex flex-col']), // title: cva(['w-full h-auto absolute top-0 text-white text-center py-[18rem]']),
  catchphrase: cva(['']),
  content: cva(['text-center']),
  paragraph: cva(['mb-5']),
}
