import {cva} from 'class-variance-authority';


export const contentCVA = {
  root: cva(['overflow-visible bg-white pb-64']),
}

export const imgCVA = {
  root: cva([],
    {
      variants: {
        floatSide: {
          right: 'max-w-[60%] float-right mt-4 !mr-[-10%] ml-4 mb-4',
          left: 'max-w-[60%] float-left mt-4 mr-4 mb-4 !ml-[-10%]',
          center: 'position-center w-[150%] !ml-[-25%] !mr-[-25%] m-auto py-10 text-center'
        }
      },
    }
  ),
  clear: cva(['clear-both']),
}

export const paragraphCVA = {
  root: cva(['text-left text-[18px]']),
}

export const contentContainerCVA = {
  root: cva([
    'w-full',
    'm-auto',
    'max-w-[800px]'
  ], {
    variants: {
      marginBottom: {
        true: 'mb-2',
        false: 'mb-0'
      }
    }
  }),
}
