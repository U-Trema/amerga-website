import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {Default} from "@/slices/Numbers/variations/default/Default";
import {homepageCVA} from "@/styles/page.styles";
import {TwoNumbers} from "@/slices/Numbers/variations/twoNumbers/TwoNumbers";
import {ThreeNumbers} from "@/slices/Numbers/variations/threeNumbers/ThreeNumbers";

/**
 * Props for `Numbers`.
 */
export type NumbersProps = SliceComponentProps<Content.NumbersSlice>;

/**
 * Component for "Numbers" Slices.
 */
const Numbers: FC<NumbersProps> = ({ slice }) => {
  return (
    <section
      className={homepageCVA.root()}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === 'default' && (
        <Default key='default' data={slice} />
      )}

      {slice.variation === 'twoNumbers' && (
        <TwoNumbers key='two-numbers' data={slice} />
      )}

      {slice.variation === 'threeNumbers' && (
        <ThreeNumbers key='three-numbers' data={slice} />
      )}
    </section>
  );
};

export default Numbers;
