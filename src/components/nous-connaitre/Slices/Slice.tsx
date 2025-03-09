import React from "react"
import {nousConnaitrePageCVA} from "@/styles/page.styles"
import {SliceZone} from "@prismicio/react"
import {SliceSectionProps} from "@/components/nous-connaitre/types"

export const SliceSection = React.memo<SliceSectionProps>(
  ({slices, components}) => (
    <section className={nousConnaitrePageCVA.slices()}>
      <SliceZone slices={slices} components={components}/>
    </section>
  )
)

SliceSection.displayName = "SliceSection"