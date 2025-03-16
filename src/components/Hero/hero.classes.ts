import {cva} from 'class-variance-authority'


export const assurancesCVA = {
  root: cva(['bg-white !px-0 pt-20 pb-10']),
}

export const containerCVA = {
  root: cva(['relative mx-4 my-12 sm:mb-16 md:mx-12 px-2']),
}

export const pictureCVA = {
  block: cva([
    'relative overflow-hidden rounded-xl min-h-[831px]',
    '[@media(min-width:1200px)]:!max-w-[60vw]'
  ]),
  img: cva(['absolute inset-0 h-full w-full object-cover']),
  badge: cva(['absolute left-5 top-5 z-10 rounded-lg pb-2.5 pl-5 pr-5 pt-2.5 font-semibold text-soft-black md:top-10 md:rounded-xl lg:top-11 lg:left-14 !gap-1']),
  badgeText: cva(['!text-sm'], {
    variants: {
      textColor: {
        white: '!text-(--color-white)',
        black: '!text-(--color-soft-black)',
      },
    },
  }),
}

export const cardCVA = {
  root: cva([
    'z-10 bg-(--color-soft-grey) overflow-hidden rounded-xl ml-5 mr-5 w-full mt-[-130px]',
    '[@media(min-width:1200px)]:absolute [@media(min-width:1200px)]:top-1/2 [@media(min-width:1200px)]:left-1/2 transform [@media(min-width:1200px)]:-translate-y-1/2 [@media(min-width:1200px)]:!max-w-[600px] [@media(min-width:1200px)]:mt-0'
  ]),
  title: cva(['!mb-4 !text-[48px] sm:!text-[56px] !leading-[56px]']),
  content: cva(['py-6 pl-5 pr-5 sm:py-12 sm:pl-12 sm:pr-12 gap-y-2 w-full max-w-full']),
  support: cva(['rounded-b-xl bg-soft-black pb-5 pl-5 pr-12 pt-5 !text-md font-semibold text-(--color-white) sm:pl-12 transition-colors duration-300 outline-none']),
}
