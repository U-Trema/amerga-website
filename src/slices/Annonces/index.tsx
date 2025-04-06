import React, {FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef} from "react";
import {Content} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import useEmblaCarousel from "embla-carousel-react";
import {getContrastYIQ} from "@/utils/getContrastYIQ";
import Autoplay from "embla-carousel-autoplay";

import styles from './styles.module.css';

type AnnoncesProps = SliceComponentProps<Content.AnnoncesSlice>;

const TEXT_COMPONENT = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="font-semibold text-sm">{children}</p>
  ),
};

const AUTOPLAY_DELAY = 5000;

const Carousel: FC<{ slides: any[]; }> = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
    duration: 35,
  }, [
    Autoplay({ playOnInit: true, delay: AUTOPLAY_DELAY, stopOnFocusIn: true })
  ]);

  const textColors = useMemo(
    () => slides.map(({ primary }) => getContrastYIQ(primary.background)),
    [slides]
  );

  return (
    <div ref={emblaRef} className={styles.embla__viewport}>
      <div className={styles.embla__container}>
        {slides.map((annonce, index) => (
          <AnnonceSlide
            key={index}
            annonce={annonce}
            textColor={textColors[index]}
          />
        ))}
      </div>
    </div>
  );
};

const AnnonceSlide: FC<{ annonce: any; textColor: string; }> = memo(({ annonce, textColor }) => (
  <div className={styles.embla__slide}>
    <div
      className="min-h-[49px] md:h-[49px] m-auto! w-[calc(100%-2rem)] mx-4 rounded-xl px-4 py-2 text-center flex flex-col md:flex-row md:items-center md:justify-between"
      style={{ backgroundColor: annonce.primary.background, color: textColor }}
    >
      <div className="flex flex-col md:flex-row items-center gap-2 md:m-auto md:inline-flex md:items-center md:gap-2">
        <div className="flex-grow md:flex-grow-0">
          <PrismicRichText
            field={annonce.primary.text}
            components={TEXT_COMPONENT}
          />
        </div>
        {annonce.primary.button.url && (
          <a
            href={annonce.primary.button.url}
            className="mt-1 md:mt-0 inline-flex items-center justify-center px-2 py-1 text-sm font-medium transition-colors hover:opacity-80 rounded-md"
            style={{
              color: textColor === 'white' ? 'black' : 'white',
              backgroundColor: textColor === 'white' ? 'white' : 'black'
            }}
          >
            {annonce.primary.button.text}
          </a>
        )}
      </div>
    </div>
  </div>
));

AnnonceSlide.displayName = "AnnonceSlide";

const Annonces: FC<AnnoncesProps> = ({ slice, slices, index }) => {
  if (index !== 0) return null;

  const annonces = slices.filter(({ slice_type }) => slice_type === "annonces");
  if (!annonces.length) return null;

  return (
    <section
      className={styles.embla}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}

    >
      <Carousel slides={annonces} />
    </section>
  );
};

export default Annonces;
