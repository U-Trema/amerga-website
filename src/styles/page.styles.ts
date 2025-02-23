import {cva} from "class-variance-authority";

export const homepageCVA = {
  root: cva(['!px-(--spacing-md) lg:px-[0] max-w-[1280px] mx-auto'])
}

export const contactpageCVA = {
  root: cva(['w-full m-auto !max-w-(--spacing-container) !px-(--spacing-md) lg:px-[0] max-w-[1280px] mx-auto']),
  hero: cva(['w-full pt-[13rem] bg-grey-primary mt-[-10rem]']),
  title: cva(['mb-5 !text-[56px] !leading-[56px]']),
  info: cva(['text-[18px]']),
}
