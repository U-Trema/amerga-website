import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {PrismicNextImage, PrismicNextLink} from "@prismicio/next";

import styles from './styles.module.css'
import {globalStyles} from "@/styles/project.classname";
import {HeroMosaicImagesSliceDefaultPrimaryImagesItem, Simplify} from "../../../prismicio-types";

/**
 * Props for `HeroMosaicImages`.
 */
export type HeroMosaicImagesProps =
  SliceComponentProps<Content.HeroMosaicImagesSlice>;

const components = {
  heading1: ({ children }: { children: ReactNode }) => <h1 className='leading-none md:leading-[normal] md:whitespace-nowrap whitespace-normal'>{children}</h1>,
  heading2: ({ children }: { children: ReactNode }) => <h2 className='md:whitespace-nowrap whitespace-normal text-xl mb-lg'>{children}</h2>,
  heading3: ({ children }: { children: ReactNode }) => <h3 className='text-background font-black text-4xl'>{children}</h3>,
  heading4: ({ children }: { children: ReactNode }) => <h4 className='text-background font-bold text-lg'>{children}</h4>
}

/**
 * Component for "HeroMosaicImages" Slices.
 */
const HeroMosaicImages: FC<HeroMosaicImagesProps> = ({ slice }) => {
  if (slice.slice_type === 'hero_mosaic_images') {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className='mt-[40px] mb-[60px] md:my-[80px]'
      >
        <header className={styles.gridContainer}>
          <div className={styles.gridItemFirst}>
            <PrismicRichText field={slice.primary.title} components={components} />
            <PrismicRichText field={slice.primary.sub_title} components={components} />
            <PrismicNextLink
              field={slice.primary.button}
              className={globalStyles.link({ variant: slice.primary.button.variant })}
            />
          </div>

          <div className={styles.gridTopRight}>
            <RenderImage image={slice.primary.images[0]} />
          </div>

          <div className={styles.gridBottomRight}>
            <RenderImage image={slice.primary.images[2]} />
          </div>

          <div className={styles.gridCentered}>
            <RenderImage image={slice.primary.images[1]} />
          </div>
        </header>
      </section>
    );
  }

  return null
};

export default HeroMosaicImages;

type RenderImageProps = {
  image: Simplify<HeroMosaicImagesSliceDefaultPrimaryImagesItem> | undefined
}

const RenderImage: FC<RenderImageProps> = ({ image }) => {
  if (!image) return null

  return (
    <div className='relative h-[100%] rounded-xl overflow-hidden'>
      <PrismicNextImage
        field={image.image}
        className='block object-cover h-full w-full aspect-square md:aspect-auto'
      />

      <div className='absolute top-[20px] left-[20px]'>
        <PrismicRichText field={image.image_title} components={components} />
        <PrismicRichText field={image.image_sub_title} components={components} />
      </div>
    </div>
  )
}
