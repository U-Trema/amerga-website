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

    if (slice.slice.type === "executive_manager") {
      return (
        <Box
          className={collaboratorCVA.root()}
          onClick={onClick}
        >
          <Box className={collaboratorCVA.imgContainer()}>
            <PrismicImage field={slice.slice.data.photo} className={collaboratorCVA.img()} />
          </Box>
          <Space h="xs" />
          <h2 className={collaboratorCVA.paragraph()}>
            <b>{slice.slice.data.name}</b>
          </h2>
          <PrismicRichText field={slice.slice.data.job_title} />
        </Box>
      )
    }

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
