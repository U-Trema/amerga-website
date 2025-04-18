import {NumbersSliceTwoNumbers} from "../../../../../prismicio-types";
import {FC, ReactNode} from "react";
import {AnimatedNumber} from "@/slices/Numbers/components/AnimatedNumber";
import * as prismicR from "@prismicio/richtext";
import {serializer} from "@/utils/serializer";
import {PrismicRichText} from "@prismicio/react";
import {Flex, SimpleGrid} from "@mantine/core";
import {getSize} from "@/slices/Numbers/variations/utils/getSize";
import {useIntersectionObserver} from "@/utils/useIntersectionObserver";
import {combineClasses} from "@/utils/combineClasses";
import {observerCVA} from "@/styles/page.styles";

type Props = {
  data: {
    slice_type: "numbers";
    slice_label: null;
    id: string;
  } & NumbersSliceTwoNumbers | any
}

const cardClasses = 'bg-white p-32 gap-24 flex-col basis-[50%] shrink-0 justify-between rounded-xl'

const description = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-2xl font-semibold text-center'>{children}</p>
}

export const TwoNumbers: FC<Props> = ({ data }) => {
  const [ref, isVisible] = useIntersectionObserver()

  if (!data.primary.twonumbers.length) return null

  const firstNumber = prismicR.serialize(data.primary.twonumbers[0].first_number, serializer)
  const secondNumber = prismicR.serialize(data.primary.twonumbers[0].second_number, serializer)

  return (
    <SimpleGrid ref={ref} cols={{ base: 1, sm: 2 }} className={combineClasses('mt-80', observerCVA.root({ isVisible }))} spacing={{ base: 24, lg: 32 }}>
      <Flex className={cardClasses}>
        <AnimatedNumber number={firstNumber} textSize={getSize(firstNumber[0].text)} />
        <PrismicRichText field={data.primary.twonumbers[0].first_description} components={description} />
      </Flex>

      <Flex className={cardClasses}>
        <AnimatedNumber number={secondNumber} textSize={getSize(secondNumber[0].text)} />
        <PrismicRichText field={data.primary.twonumbers[0].second_description} components={description} />
      </Flex>
    </SimpleGrid>
  )
}
