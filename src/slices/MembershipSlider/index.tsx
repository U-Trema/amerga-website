import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {homepageCVA} from "@/styles/page.styles";
import {Grid, GridCol} from "@mantine/core";

/**
 * Props for `MembershipSlider`.
 */
export type MembershipSliderProps =
  SliceComponentProps<Content.MembershipSliderSlice>;

const components = {
  heading2: ({ children }: { children: ReactNode }) => <h2 className='text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-display-fira'>{children}</h2>,
}

/**
 * Component for "MembershipSlider" Slices.
 */
const MembershipSlider: FC<MembershipSliderProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className='w-full bg-soft-black py-128 text-white'
    >
      <div className={homepageCVA.root()}>
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

export default MembershipSlider;
