import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {homePageCVA, observerCVA} from "@/styles/page.styles";
import {Grid, GridCol} from "@mantine/core";
import {useIntersectionObserver} from "@/utils/useIntersectionObserver";
import {combineClasses} from "@/utils/combineClasses";

/**
 * Props for `Memberships`.
 */
export type MembershipsProps =
  SliceComponentProps<Content.MembershipsSlice>;

const components = {
  heading2: ({ children }: { children: ReactNode }) => <h2 className='text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-display-fira'>{children}</h2>,
}

/**
 * Component for "Memberships" Slices.
 */
const Memberships: FC<MembershipsProps> = ({ slice }) => {
  const [ref, isVisible] = useIntersectionObserver();

  if (slice.variation !== 'default') return;

  return (
    <section
      ref={ref}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={combineClasses(`w-full bg-soft-black py-128 text-white`, observerCVA.root({ isVisible }))}
    >
      <div className={homePageCVA.root()}>
        <PrismicRichText field={slice.primary.title} components={components} />

        <Grid justify='right' grow={false} columns={12} className='mt-64 text-lg md:text-xl leading-32'>
          <GridCol offset={6} span={{ base: 12, md: 8, lg: 6 }}>
            <PrismicRichText field={slice.primary.description} />
          </GridCol>
        </Grid>
      </div>
    </section>
  );
};

export default Memberships;
