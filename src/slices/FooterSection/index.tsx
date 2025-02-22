import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FooterSection`.
 */
export type FooterSectionProps =
  SliceComponentProps<Content.FooterSectionSlice>;

/**
 * Component for "FooterSection" Slices.
 */
const FooterSection: FC<FooterSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_section (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FooterSection;
