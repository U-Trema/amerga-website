import { cva } from 'class-variance-authority'


export const footerCVA = {
    root: cva([
        'bg-(--color-soft-black)',
        'text-white',
        'pt-15',
        'pb-10',
        'mt-80',
        'md:mt-128'
    ]),
}

export const footerContainerCVA = {
    root: cva([
        'w-full',
        'm-auto',
        '!max-w-(--spacing-container)',
        'px-(--spacing-md)',
        'lg:px-0',
    ]),
}

export const footerGridCVA = {
    firstCol: cva(['mb-64']),
    firstColBox: cva(['underline text-sm']),
    col: cva(['flex flex-col sm:flex-row mb-8 gap-32 md:gap-0']),
}

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
    title: cva(['text-white opacity-60 font-semibold text-sm uppercase mb-8']),
    link: cva(['hover:text-amerga-orange underline decoration-transparent hover:decoration-inherit transition duration-125 text-sm']),
}

export const footerBottomCVA = {
    first: cva(['mb-6']),
    second: cva(['sm:flex-row flex-col-reverse sm:justify-between grid grid-cols-1 gap-y-6']),
    copyright: cva(['text-[10px]']),
    legal: cva(['gap-x-4 text-xs font-bold']),
}
