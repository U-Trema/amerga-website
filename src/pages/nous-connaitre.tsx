import React, {useMemo} from "react"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next"
import {createClient} from "@/prismicio"
import {Box, Space} from "@mantine/core"
import {nousConnaitrePageCVA} from "@/styles/page.styles"
import {ModalManager} from "@/components/Modal/Modal"
import {ContentSection} from "@/components/nous-connaitre/Content/Content"
import {SliceSection} from "@/components/nous-connaitre/Slices/Slice"
import {Header} from "@/components/nous-connaitre/Header/Header"
import {useModal} from "@/hooks/useModal/useModal"
import {ContentBlock, ProcessedContent, RichTextComponentsProps, SliceType} from "@/components/nous-connaitre/types"
import {CollaboratorSlice} from "@/components/nous-connaitre/Collaborator/Collaborator"


const processContent = (contents: any[], count: number): ProcessedContent[] => (
  contents.map(({content}) => ({
    content: content.map((block: ContentBlock) => ({
      ...block,
      text: block.text.replace("{{count}}", count.toString()),
    })),
  }))
)
const createRichTextComponents = ({handleOpenModal}: RichTextComponentsProps) => ({
  collaborators: (slice: SliceType) => <CollaboratorSlice slice={slice} openModal={handleOpenModal}/>,
  heading2: ({children}: {children: React.ReactNode}) => <h2 className="text-5xl">{children}</h2>,
  paragraph: ({children}: {children: React.ReactNode}) => <h2 className="text-lg">{children}</h2>
})

export default function NousConnaitre({page, employees}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page?.data) return null

  const {modalContent, opened, handleOpenModal, handleCloseModal} = useModal()
  const {hero = [], content: contents = []} = page.data
  const [{title, catchphrase, image} = {title: undefined, catchphrase: undefined, image: undefined}] = hero
  const [{data: {slices = []}} = {data: {slices: []}}] = employees || []
  const count = slices.length

  const contentWithCount = useMemo(() =>
      processContent(contents, count),
    [contents, count]
  )
  const components = useMemo(() =>
      createRichTextComponents({handleOpenModal}),
    [handleOpenModal]
  )

  return (
    <Box id="nous-connaitre-section" className={nousConnaitrePageCVA.box()}>
      <ModalManager modalContent={modalContent} opened={opened} onClose={handleCloseModal}/>
      <Header title={title} catchphrase={catchphrase} image={image}/>
      <ContentSection content={contentWithCount} components={components}/>
      <SliceSection slices={slices} components={components}/>
      <Space h="xl" />
      <Space h="xl" />
    </Box>
  )
}

export const getStaticProps = async ({previewData}: GetStaticPropsContext) => {
  const client = createClient({previewData})

  const [nav, footer, page, employees] = await Promise.all([
    client.getSingle("menu"),
    client.getSingle("footer"),
    client.getSingle("nous_connaitre"),
    client.getAllByType("collaborators")
  ])

  return {props: {nav, footer, page, employees}}
}