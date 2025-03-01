import {cva} from "class-variance-authority";

export const animatedClasses = {
  root: cva(['text-9xl font-bold text-center truncate'], {
    variants: {
      label: {
        'orange-text': 'text-amerga-orange',
        'blue-text': 'text-amerga-blue'
      },
      text: {
        small: '!text-[5.4rem] md:!text-7xl lg:!text-9xl',
        medium: '!text-[6.3rem] md:!text-7xl lg:!text-9xl',
        large: 'text-9xl'
      }
    }})
}
