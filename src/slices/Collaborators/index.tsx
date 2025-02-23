import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Collaborators`.
 */
export type CollaboratorsProps =
  SliceComponentProps<Content.CollaboratorsSlice>;

/**
 * Component for "Collaborators" Slices.
 */
const Collaborators: FC<CollaboratorsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for collaborators (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Collaborators;
