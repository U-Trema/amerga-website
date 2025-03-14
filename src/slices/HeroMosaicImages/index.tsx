import {FC, ReactNode, useCallback, useEffect} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {PrismicNextImage, PrismicNextLink} from "@prismicio/next";

import styles from './styles.module.css'
import slider from './slider.module.css'
import {globalStyles} from "@/styles/project.classname";
import {HeroMosaicImagesSliceDefaultPrimaryImagesItem, Simplify} from "../../../prismicio-types";
import {homePageCVA} from "@/styles/page.styles"
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {combineClasses} from "@/utils/combineClasses";
import {cva} from "class-variance-authority";

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
    console.log(slice.primary.images)
    const images = slice.primary.images.reduce((acc, image, index) => {
      if (index % 3 === 0) acc.first.push(image as never)
      if (index % 3 === 1) acc.second.push(image as never)
      if (index % 3 === 2) acc.third.push(image as never)

      return acc
    }, { first: [], second: [], third: [] })

    return (
      <div className={homePageCVA.root()} key={slice.slice_type}>
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className='mt-[40px] mb-[60px] md:my-80'
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
              <RenderCarousel images={images.first} delay={4000} height={900} />
            </div>

            <div className={styles.gridBottomRight}>
              <RenderCarousel images={images.third} delay={4000} />
            </div>

            <div className={styles.gridCentered}>
              <RenderCarousel images={images.second} delay={4000} height={400} direction='rtl' />
            </div>
          </header>
        </section>
      </div>
    );
  }

  return null
};

export default HeroMosaicImages;

type RenderImageProps = {
  image: Simplify<HeroMosaicImagesSliceDefaultPrimaryImagesItem> | undefined
  height?: number
}

const RenderImage: FC<RenderImageProps> = ({ image, height }) => {
  if (!image) return null

  return (
    <div className='relative h-[100%] rounded-xl overflow-hidden'>
      <PrismicNextImage
        field={image.image}
        className='block object-cover aspect-square md:aspect-auto h-auto'
        // @ts-ignore
        style={{ width: '100%', height: 'auto', '@media (min-width: 768px)': { height: `${height}px` } }}
      />

      <div className='absolute top-[20px] left-[20px]'>
        <PrismicRichText field={image.image_title} components={components} />
        <PrismicRichText field={image.image_sub_title} components={components} />
      </div>
    </div>
  )
}

type RenderCarouselProps = {
  images: Simplify<HeroMosaicImagesSliceDefaultPrimaryImagesItem>[]
  delay?: number
  direction?: 'ltr' | 'rtl'
  height?: number
}

const RenderCarousel: FC<RenderCarouselProps> = ({ images, delay = 3000, direction = 'ltr', height }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, direction }, [
    Autoplay({ playOnInit: true, delay: delay })
  ])

  if (!images) return null
  if (images.length === 1) return <RenderImage image={images[0]} />

  return (
    <section className={combineClasses(slider.embla, 'relative h-[100%] rounded-xl overflow-hidden')}>
      <div className={slider.embla__viewport} ref={emblaRef}>
        <div className={combineClasses(slider.embla__container, direction === 'rtl' ? 'flex-row-reverse' : 'flex-row')}>
          {images.map((item: any, index: any) => (
            <div className={slider.embla__slide} key={index}>
              <RenderImage image={item} height={height} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
