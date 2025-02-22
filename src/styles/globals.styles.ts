import {cva} from "class-variance-authority";

export const globalStyles = {
  link: cva(['inline-block rounded-md p-4 text-base font-semibold transition-all duration-300'], {
    variants: {
      variant: {
        primary: 'bg-amerga-orange hover:bg-amerga-orange-hover',
        secondary: 'bg-grey-secondary hover:bg-grey-primary'
      }
    }
  })
}
