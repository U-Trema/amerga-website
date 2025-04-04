import React, {FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef} from "react";
import {Content} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import useEmblaCarousel from "embla-carousel-react";
import {getContrastYIQ} from "@/utils/getContrastYIQ";
import Autoplay from "embla-carousel-autoplay";

type AnnoncesProps = SliceComponentProps<Content.AnnoncesSlice>;

const TEXT_COMPONENT = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="font-semibold text-sm">{children}</p>
  ),
};

const AUTOPLAY_DELAY = 5000;

const Carousel: FC<{ slides: any[]; }> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    // align: "center",
    // skipSnaps: false,
    // duration: 25,
    // direction: "ltr",
    // watchDrag: false,
  }, [
    Autoplay({ playOnInit: true, delay: AUTOPLAY_DELAY, stopOnFocusIn: true })
  ]);

  const isPausedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const textColors = useMemo(
    () => slides.map(({ primary }) => getContrastYIQ(primary.background)),
    [slides]
  );

  // const startAutoplay = useCallback(() => {
  //   if (intervalRef.current) clearInterval(intervalRef.current);
  //
  //   intervalRef.current = setInterval(() => {
  //     if (!isPausedRef.current && emblaApi?.canScrollNext()) {
  //       emblaApi.scrollNext();
  //     }
  //   }, AUTOPLAY_DELAY);
  // }, [emblaApi]);
  //
  // useEffect(() => {
  //   if (!emblaApi) return;
  //
  //   startAutoplay();
  //   return () => {
  //     intervalRef.current && clearInterval(intervalRef.current);
  //   };
  // }, [emblaApi, startAutoplay]);

  // const handleMouseEnter = useCallback(() => {
  //   isPausedRef.current = true;
  //   intervalRef.current && clearInterval(intervalRef.current);
  // }, []);
  //
  // const handleMouseLeave = useCallback(() => {
  //   isPausedRef.current = false;
  //   startAutoplay();
  // }, [startAutoplay]);

  return (
    <div className="grid w-full [grid-template-columns:1fr_min(1280px,100%)_1fr] [&>*]:col-start-2">
      <div
        className="relative w-full mx-auto"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((annonce, index) => (
              <AnnonceSlide
                key={index}
                annonce={annonce}
                textColor={textColors[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnonceSlide: FC<{ annonce: any; textColor: string; }> = memo(({ annonce, textColor }) => (
  <div className="flex-[0_0_100%] min-w-0 transition-all ease-in-out">
    <div
      className="h-[49px] m-auto! w-[calc(100%-2rem)] mx-4 rounded-xl px-4 py-2 text-center flex items-center justify-between"
      style={{ backgroundColor: annonce.primary.background, color: textColor }}
    >
      <div className="h-full m-auto inline-flex items-center gap-2">
        <PrismicRichText
          field={annonce.primary.text}
          components={TEXT_COMPONENT}
        />
        {annonce.primary.button.url && (
          <a
            href={annonce.primary.button.url}
            className="h-full inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-black hover:bg-black/80 rounded-md transition-colors"
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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Carousel slides={annonces} />
    </section>
  );
};

export default Annonces;
