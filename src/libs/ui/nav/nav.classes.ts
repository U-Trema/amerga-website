import {cva} from "class-variance-authority";

export const navContainerCVA = {
  root: cva(['!px-(--spacing-md) lg:px-[0] !py-[1.5rem] w-full max-w-[1280px] m-auto'])
}

export const navTabCVA = {
  root: cva(['!bg-grey-primary !rounded-[14px] !p-[4px] w-fit h-[50px] items-center self-center !hidden md:!flex'], {
    variants: {
      opened: {
        true: 'md:!hidden'
      }
    }
  })
}

export const navListCVA = {
  root: cva(['!gap-1 h-full'])
}

export const tabsTabCVA = {
  root: cva(['!text-soft-black !text-sm !font-semibold !rounded-[10px] hover:!bg-grey-secondary !py-2.5 !px-4'])
}

export const responsiveMenuCVA = {
  root: cva(['z-10 shadow-md py-[1.5rem] w-full absolute'], {
    variants: {
      opened: {
        true: 'block',
        false: 'hidden'
      }
    }
  })
}
