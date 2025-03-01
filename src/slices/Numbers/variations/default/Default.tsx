import {FC, ReactNode} from "react";
import {NumbersSliceDefaultPrimary, Simplify} from "../../../../../prismicio-types";
import {SharedSliceVariation} from "@prismicio/client";
import {PrismicRichText} from "@prismicio/react";
import * as prismicR from "@prismicio/richtext";
import { AnimatedNumber } from "../../components/AnimatedNumber";
import {defaultClasses} from "@/slices/Numbers/variations/default/defaultClasses";
import {serializer} from "@/utils/serializer";
import {getSize} from "@/slices/Numbers/variations/utils/getSize";

type Props = {
  data: {
    slice_type: "numbers";
    slice_label: null;
    id: string;
  } & SharedSliceVariation<"default", Simplify<NumbersSliceDefaultPrimary>, never>
}

const description = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-5xl font-bold leading-[50px] text-center mt-24'>{children}</p>
}

export const Default: FC<Props> = ({ data }) => {
  const number = prismicR.serialize(data.primary.number, serializer)

  return (
    <div className={defaultClasses.root()}>
      <AnimatedNumber number={number} textSize={getSize(number[0].text)} />
      <PrismicRichText field={data.primary.description} components={description} />
    </div>
  )
};
