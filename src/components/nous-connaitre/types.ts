import {Content} from "@prismicio/client"
import {ImageField, KeyTextField} from "@prismicio/client"

export type ContentBlock = {
  text: string
  [key: string]: any
}

export type ProcessedContent = {content: any}

export type SliceType = Content.NousConnaitreDocumentDataSlicesSlice

export type RichTextComponentsProps = {
  handleOpenModal: (content: unknown) => void
}

export type ContentSectionProps = {
  content: ProcessedContent[]
  components: ReturnType<any>
}

export type HeaderProps = {
  title?: KeyTextField
  catchphrase?: KeyTextField
  image?: ImageField
}

export type OpenModalProps = {
  slice: SliceType
  openModal: (slice: unknown) => void
}

export type SliceSectionProps = {
  slices: Content.CollaboratorsSlice[]
  components: ReturnType<any>
}
