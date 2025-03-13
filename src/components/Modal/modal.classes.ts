import {cva} from 'class-variance-authority'


export const modalCVA = {
  root: cva(['!rounded-xl !max-w-[min(750px,100%)]']),
  container: cva(['!rounded-xl sm:p-4 overflow-hidden']),
  box: cva(['flex flex-col gap-4']),
  head: cva(['flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left']),
  img: cva(['overflow-hidden rounded-xl max-w-[200px] max-h-[200px] w-[200px]']),
  info: cva(['flex flex-col gap-[0.5rem] items-center sm:items-start']),
  date: cva(['flex gap-2']),
}

export const paragraphCVA = {
  title: cva(['text-4xl']),
  text: cva(['!text-sm']),
}
