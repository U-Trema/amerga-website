import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {homePageCVA, observerCVA} from "@/styles/page.styles";
import {localisation} from "@/slices/Localisation/localisation.classes";
import {PrismicNextImage} from "@prismicio/next";
import {combineClasses} from "@/utils/combineClasses";
import {useIntersectionObserver} from "@/utils/useIntersectionObserver";

const address = {
  paragraph: ({ children }: { children: ReactNode }) => <p className={localisation.address()}>{children}</p>,
}

/**
 * Props for `Localisation`.
 */
export type LocalisationProps = SliceComponentProps<Content.LocalisationSlice>;

/**
 * Component for "Localisation" Slices.
 */
const Localisation: FC<LocalisationProps> = ({ slice }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={combineClasses('pt-128', observerCVA.root({ isVisible }))}
    >
      <div className={combineClasses(homePageCVA.root(), '!px-0 md:!px-(--spacing-md)')}>
        <div className={localisation.root()}>
          <div className='row-span-1 order-2 md:md:order-0 md:grid-cols-4 md:col-end-9 md:col-start-1'>
            <h2 className={localisation.title()}>{slice.primary.title}</h2>
            <PrismicRichText field={slice.primary.address} components={address} />
          </div>

          <div className='row-span-1 order-1 md:order-0 md:grid-cols-4 md:col-span-4 md:col-start-9'>
            <PrismicNextImage field={slice.primary.image} className={localisation.image()} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Localisation;
