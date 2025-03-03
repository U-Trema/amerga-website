import {FC, ReactNode} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, PrismicText, SliceComponentProps} from "@prismicio/react";
import {Flex, Grid, GridCol, SimpleGrid} from "@mantine/core";
import {PrismicNextImage} from "@prismicio/next";
import {homePageCVA, observerCVA} from "@/styles/page.styles";
import {combineClasses} from "@/utils/combineClasses";
import {useIntersectionObserver} from "@/utils/useIntersectionObserver";

/**
 * Props for `CartesAssurances`.
 */
export type CartesAssurancesProps =
  SliceComponentProps<Content.CartesAssurancesSlice>;

const titleComponent = {
  heading2: ({ children }: { children: ReactNode }) => <h2 className='text-6xl font-bold tracking-tight font-display-fira'>{children}</h2>,
}

const descriptionComponent = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-lg'>{children}</p>,
}

/**
 * Component for "CartesAssurances" Slices.
 */
const CartesAssurances: FC<CartesAssurancesProps> = ({ slice }) => {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div ref={ref} className={combineClasses(homePageCVA.root(), observerCVA.root({ isVisible }))} key={slice.slice_type}>
      <section
        key={slice.slice_type}
        className='md:pr-0 py-30 md:py-40'
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Flex className='gap-24 sm:gap-32' direction={{ base: 'column', sm: 'row' }}>
          <div className='basis-full sm:basis-1/2'>
            <PrismicRichText field={slice.primary.title} components={titleComponent} />
          </div>
          <div className='basis-full sm:basis-1/2'>
            <PrismicRichText field={slice.primary.description} components={descriptionComponent} />
          </div>
        </Flex>

        <RenderCards cards={slice.primary.cards} />
      </section>
    </div>
  );
};

export default CartesAssurances;

const cardTitleComponent = {
  heading4: ({ children }: { children: ReactNode }) => <h4 className='text-xl font-semibold mt-16 mb-8'>{children}</h4>,
}

const RenderCards: FC<{ cards: any }> = ({ cards }) => {
  if (!cards.length) return null

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 24, md: 32 }} verticalSpacing={{ base: 24, md: 32 }} className='mt-32 md:mt-80'>
      {cards.map((item: any, index: number) => {
        return (
          <div key={index} className='bg-white rounded-2xl p-24'>
            <PrismicNextImage field={item.logo} style={{ width: '60px', display: 'block' }} />
            <PrismicRichText field={item.title} components={cardTitleComponent} />
            <p>{item.description}</p>
          </div>
        )
      })}
    </SimpleGrid>
  )
}
