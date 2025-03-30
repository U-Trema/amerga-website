import React from "react"
import {Box, Container, Space} from "@mantine/core"
import {nousConnaitrePageCVA} from "@/styles/page.styles"
import {PrismicRichText} from "@prismicio/react"
import {ContentSectionProps} from "@/components/nous-connaitre/types"

export const ContentSection = React.memo<ContentSectionProps>(
  ({content, components}) => (
    <Container className={nousConnaitrePageCVA.content()}>
      <section>
        <Space h="xl" />
        <Space h="xl" />
        {content.map(({content}, index) => (
          <Box key={index} className={nousConnaitrePageCVA.paragraph()}>
            <PrismicRichText field={content} components={components} />
          </Box>
        ))}
      </section>
      <Space h="xl" />
      <Space h="xl" />
    </Container>
  )
)

ContentSection.displayName = "ContentSection"
