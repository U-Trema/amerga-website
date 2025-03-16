import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {Button} from "@mantine/core";
import {globalStyles} from "@/styles/project.classname";
import {PrismicNextLink} from "@prismicio/next";
import {combineClasses} from "@/utils/combineClasses";
import Link from "next/link";
import {linkResolver, LinkType} from "@/prismicio";

/**
 * Props for `MenuLink`.
 */
export type MenuLinkProps = SliceComponentProps<Content.MenuLinkSlice>;

const description = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-sm'>{children}</p>,
}

/**
 * Component for "MenuLink" Slices.
 */
const MenuLink: FC<MenuLinkProps> = ({ slice }) => {
  if (!slice) return null

  return (
    <div
      className='bg-soft-grey p-24 flex flex-col gap-16 h-full'
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.description} components={description} />
      <PrismicRichText field={slice.primary.sub_description} components={description} />

      <Link
        href={linkResolver(slice.primary.link as LinkType)}
        className={combineClasses(
          globalStyles.link({ variant: slice.primary.link.variant, size: 'small' }),
          'block w-fit'
        )}
      >
        {slice.primary.link.text}
      </Link>
    </div>
  );
};

export default MenuLink;
