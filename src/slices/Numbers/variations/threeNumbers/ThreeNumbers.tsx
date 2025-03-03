import {NumbersSliceThreeNumbers} from "../../../../../prismicio-types";
import {FC, ReactNode} from "react";
import {Flex, SimpleGrid} from "@mantine/core";
import * as prismicR from "@prismicio/richtext";
import {serializer} from "@/utils/serializer";
import {AnimatedNumber} from "@/slices/Numbers/components/AnimatedNumber";
import {getSize} from "@/slices/Numbers/variations/utils/getSize";
import {PrismicRichText} from "@prismicio/react";
import {useIntersectionObserver} from "@/utils/useIntersectionObserver";
import {combineClasses} from "@/utils/combineClasses";
import {observerCVA} from "@/styles/page.styles";

type Props = {
  data: {
    slice_type: "numbers";
    slice_label: null;
    id: string;
  } & NumbersSliceThreeNumbers | any
}

const cardClasses = 'bg-white p-32 gap-24 flex-col basis-[50%] shrink-0 justify-between rounded-xl'

const description = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-2xl font-semibold text-center'>{children}</p>
}

export const ThreeNumbers: FC<Props> = ({ data }) => {
  const [ref, isVisible] = useIntersectionObserver()

  if (!data.primary.threenumbers.length) return null

  const first = prismicR.serialize(data.primary.threenumbers[0].first_number, serializer)
  const second = prismicR.serialize(data.primary.threenumbers[0].second_number, serializer)
  const third = prismicR.serialize(data.primary.threenumbers[0].third_number, serializer)

  return (
    <SimpleGrid ref={ref} cols={{ base: 1, md: 3 }} className={combineClasses('mt-80', observerCVA.root({ isVisible }))} spacing={{ base: 24, md: 32 }}>
      <Flex className={cardClasses}>
        <AnimatedNumber number={first} textSize={getSize(first[0].text)} />
        <PrismicRichText field={data.primary.threenumbers[0].first_description} components={description} />
      </Flex>

      <Flex className={cardClasses}>
        <AnimatedNumber number={second} textSize={getSize(second[0].text)} />
        <PrismicRichText field={data.primary.threenumbers[0].second_description} components={description} />
      </Flex>

      <Flex className={cardClasses}>
        <AnimatedNumber number={third} textSize={getSize(third[0].text)} />
        <PrismicRichText field={data.primary.threenumbers[0].third_description} components={description} />
      </Flex>
    </SimpleGrid>
  )
}
