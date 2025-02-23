import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MembershipSlider`.
 */
export type MembershipSliderProps =
  SliceComponentProps<Content.MembershipSliderSlice>;

/**
 * Component for "MembershipSlider" Slices.
 */
const MembershipSlider: FC<MembershipSliderProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for membership_slider (variation: {slice.variation})
      Slices
    </section>
  );
};

export default MembershipSlider;
