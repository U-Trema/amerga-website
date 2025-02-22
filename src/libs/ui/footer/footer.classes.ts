import { cva } from 'class-variance-authority';


export const footerCVA = {
    root: cva([
        'bg-(--color-soft-black)',
        'text-white',
        'pt-15',
        'pb-10',
    ]),
};

export const footerContainerCVA = {
    root: cva([
        'w-full',
        'm-auto',
        '!max-w-(--spacing-container)',
        'px-(--spacing-md)',
        'lg:px-0',
    ]),
};

export const footerGridCVA = {
    root: cva([
        'grid',
        'grid-cols-4',
        'xs:grid-cols-8',
        'md:grid-cols-12',
        'gap-4',
        'xs:gap-5',
        'sm:gap-6',
        'md:gap-7',
        'lg:gap-7',
        'xl:gap-8',
    ]),
    firstCol: cva(['!max-w-[250px] mb-8 lg:mb-0']),
    firstColBox: cva(['!max-w-[200px] underline text-sm']),
    col: cva(['flex flex-col gap-y-8 sm:flex-row sm:gap-x-[130px] sm:gap-y-0 mb-8']),
};

export const footerColumnCVA = {
    root: cva([
        'col-span-12',
        'md:col-span-4',
        'flex',
        'flex-col',
        'gap-2',
    ]),
    block: cva(['flex flex-col gap-2 max-w-[200px]']),
    grid: cva(['grid grid-cols-1 gap-y-8 xs:grid-cols-2 sm:grid-cols-3']),
    col: cva(['flex-col gap-4']),
    title: cva(['text-white opacity-60 font-semibold']),
    link: cva(['hover:text-(--color-amerga-organge) underline decoration-transparent hover:decoration-inherit transition duration-125']),
};

export const footerBottomCVA = {
    first: cva(['mb-4']),
    second: cva(['sm:flex-row flex-col-reverse sm:justify-between grid grid-cols-1 gap-y-4']),
    copyright: cva(['text-sm']),
    legal: cva(['gap-x-4 text-xs font-bold']),
};
