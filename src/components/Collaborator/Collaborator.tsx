import React from "react"
import {Box, Space} from "@mantine/core"
import {PrismicImage, PrismicRichText} from "@prismicio/react"
import {collaboratorCVA} from "@/components/Collaborator/collaborator.classes"

const component = {
  paragraph: ({children}: {children: React.ReactNode}) => (
    <h2 className={collaboratorCVA.paragraph()}>
      <b>{children}</b>
    </h2>
  )
}

export const Collaborator = React.memo(
  ({slice, openModal}: {slice: any, openModal: (content: any) => void}) => {
    const {slice: collaboratorSlice} = slice
    const onClick = () => openModal(collaboratorSlice)

    return (
      <Box
        className={collaboratorCVA.root()}
        onClick={onClick}
      >
        <Box className={collaboratorCVA.imgContainer()}>
          <PrismicImage field={collaboratorSlice.primary.photo} className={collaboratorCVA.img()} />
        </Box>
        <Space h="xs" />
        <PrismicRichText
          field={collaboratorSlice.primary.name}
          components={component}
        />
        <PrismicRichText field={collaboratorSlice.primary.job} />
      </Box>
    )
  }
)

Collaborator.displayName = "Collaborator"