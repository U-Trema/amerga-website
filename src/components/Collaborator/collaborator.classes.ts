import {cva} from 'class-variance-authority'


export const collaboratorCVA = {
  root: cva(['flex flex-col items-center overflow-hidden !cursor-pointer']),
  img: cva(['max-w-[115px] max-h-[115px] rounded-xl overflow-hidden']),
  paragraph: cva(['text-2xl']),
}
