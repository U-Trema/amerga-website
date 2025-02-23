import {cva} from "class-variance-authority";

export const homepageCVA = {
  root: cva(['!px-(--spacing-md) lg:px-[0] max-w-[1280px] mx-auto'])
}

export const contactpageCVA = {
  root: cva(['w-full m-auto !max-w-(--spacing-container) !px-(--spacing-md) lg:px-[0] max-w-[1280px] mx-auto']),
  title: cva(['mb-16']),
  info: cva(['text-[18px]']),
}
