import {FC, ReactNode, useCallback, useEffect, useState} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'

import slider from './slider.module.css';
import {PrismicNextImage} from "@prismicio/next";

/**
 * Props for `Collaborators`.
 */
export type CollaboratorsProps =
  SliceComponentProps<Content.CollaboratorsSlice>;

const nameComponent = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='font-semibold text-lg'>{children}</p>
}

const jobComponent = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-xs'>{children}</p>
}

const EmblaCarousel = ({ slides }: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 1 })
  ])

  const [, setIsPlaying] = useState(false)

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    setIsPlaying(autoScroll.isPlaying())
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()))
  }, [emblaApi])

  return (
    <div
      className={slider.embla}
      onMouseOver={toggleAutoplay}
      onMouseLeave={toggleAutoplay}
    >
      <div className='overflow-hidden' ref={emblaRef}>
        <div className={slider.embla__container}>
          {slides.map((collaborator: any, index: any) => (
            <div className={slider.embla__slide} key={index}>
              <div className={slider.cardimage}>
                <PrismicNextImage
                  field={collaborator.primary.photo}
                  {...(!collaborator.primary.photo.alt?.length && { alt: "" })}
                  style={{ display: 'block', objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </div>
              <div className='text-white text-center mt-3'>
                <PrismicRichText field={collaborator.primary.name} components={nameComponent} />
                <PrismicRichText field={collaborator.primary.job} components={jobComponent} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Component for "Collaborators" Slices.
 */
const Collaborators: FC<CollaboratorsProps> = ({ slice }) => {
  // @ts-ignore
  const collaborators = slice.data.slices
  if (!collaborators.length) return null

  return (
    <section
      data-slice-type={slice.slice_type}
      className='w-full bg-soft-black pb-128'
      data-slice-variation={slice.variation}
    >
      <EmblaCarousel slides={[...collaborators, ...collaborators, ...collaborators]} />
    </section>
  );
};

export default Collaborators;
