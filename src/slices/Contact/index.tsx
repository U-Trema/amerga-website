import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {homepageCVA} from "@/styles/page.styles";
import {combineClasses} from "@/utils/combineClasses";
import {globalStyles} from "@/styles/project.classname";
import {PrismicNextLink} from "@prismicio/next";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const components = {
  heading2: ({ children }: { children: ReactNode }) => <h2 className='text-5xl md:text-6xl font-bold font-display-fira'>{children}</h2>,
  paragraph: ({ children }: { children: ReactNode }) => <p className='mt-24 mb-24 text-xl'>{children}</p>,
}

/**
 * Component for "Contact" Slices.
 */
const Contact: FC<ContactProps> = ({ slice }) => {
  return (
    <section
      className={combineClasses(homepageCVA.root(), 'mt-80 px-16')}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className='bg-soft-black text-soft-grey text-left md:text-center px-16 md:px-80 py-80 rounded-xl'>
        <PrismicRichText field={slice.primary.title} components={components} />
        <PrismicRichText field={slice.primary.description} components={components} />
        <PrismicNextLink
          field={slice.primary.link}
          className={globalStyles.link({ variant: slice.primary.link.variant })}
        />
      </div>
    </section>
  );
};

export default Contact;
