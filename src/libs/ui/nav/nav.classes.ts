import {cva} from "class-variance-authority";

export const navContainerCVA = {
  root: cva(['!px-(--spacing-md) lg:px-[0] !py-[1.5rem] w-full max-w-[1280px] m-auto'])
}

export const navTabCVA = {
  root: cva(['!bg-grey-primary !rounded-[14px] !p-[4px] w-fit h-[50px] items-center self-center !hidden md:!flex'], {
    variants: {
      opened: {
        // true: 'md:!hidden'
        true: ''
      }
    }
  })
}

export const navListCVA = {
  root: cva(['!gap-1 h-full relative'])
}

export const tabsTabCVA = {
  root: cva(['focus:!outline-amerga-orange focus:!outline-1 !z-5 !text-soft-black !text-sm !tracking-[-0.14px] !font-semibold !rounded-[10px] hover:!bg-grey-secondary !py-2.5 !px-4'], {
    variants: {
      active: {
        true: '!bg-grey-secondary !outline-amerga-orange !outline-1',
        false: ''
      },
      isDropdown: {
        true: '[&:has([aria-expanded="true"])]:!bg-white [&:has([aria-expanded="true"])]:!outline-amerga-orange [&:has([aria-expanded="true"])]:!outline-1',
        false: ''
      }
    }
  })
}

export const responsiveMenuCVA = {
  root: cva(['z-10 shadow-md py-[1.5rem] w-full absolute'], {
    variants: {
      opened: {
        true: 'block sm:hidden',
        false: 'hidden'
      }
    }
  })
}

export const accordionCVA = {
  root: cva(['!flex justify-between w-full flex-row-reverse !font-semibold p-2.5 rounded-[10px] [&:has([aria-expanded="true"])]:!bg-red-500'], {
    variants: {
      active: {
        true: '!bg-grey-secondary',
        false: ''
      }
    }
  })
}

export const mobileLinksCVA = {
  root: cva(['!p-2.5 !rounded-[10px] hover:!bg-grey-secondary'], {
    variants: {
      active: {
        true: '!bg-grey-secondary',
        false: ''
      },
      subItem: {
        true: '!px-5 !py-1.5 !text-sm block !font-normal',
        false: '!font-semibold'
      }
    }
  })
}
