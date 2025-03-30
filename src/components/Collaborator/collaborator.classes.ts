import {cva} from 'class-variance-authority'


export const collaboratorCVA = {
  root: cva(['flex flex-col items-center overflow-hidden !cursor-pointer']),
  imgContainer: cva(['max-w-[115px] max-h-[115px] rounded-xl overflow-hidden']),
  img: cva(['w-[115px] aspect-square object-cover']),
  paragraph: cva(['text-2xl']),
}
