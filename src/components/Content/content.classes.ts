import {cva} from 'class-variance-authority';


export const contentCVA = {
  root: cva([
    'text-[rgb(30_30_30)] tracking-[-0.16px] leading-inherit font-normal antialiased',
    {
      variants: {
        font: {
          primary: 'font-[var(--font-primary)]',
        },
      },
      defaultVariants: {
        font: 'primary',
      },
    }
  ])
};

export const imageVariants = cva('object-cover', {
  variants: {
    position: {
      left: 'ml-0 mr-auto',
      right: 'ml-auto mr-0',
      center: 'mx-auto',
    },
  },
  defaultVariants: {
    position: 'center',
  },
});
