import {GetStaticPropsContext, InferGetStaticPropsType} from "next"
import {createClient} from "@/prismicio"
import {Box, Container, Modal, Space, Text} from "@mantine/core"
import {nousConnaitrePageCVA} from "@/styles/page.styles"
import React, {FC, useState} from "react"
import {PrismicImage, PrismicRichText, SliceZone} from "@prismicio/react"
import {PrismicNextImage} from "@prismicio/next"
import {useDisclosure} from "@mantine/hooks"


const Collaborator: FC<{slice: any; openModal: (content: any) => void}> = React.memo(({slice, openModal}) => {
  const {slice: collaboratorSlice} = slice

  return (
    <Box className="flex flex-col items-center overflow-hidden !cursor-pointer" onClick={() => openModal(collaboratorSlice)}>
      <Box className="w-full h-full max-w-[115px] max-h-[115px] rounded-xl overflow-hidden">
        <PrismicImage field={collaboratorSlice.primary.photo}/>
      </Box>
      <Space h="xs"/>
      <PrismicRichText field={collaboratorSlice.primary.name} components={{paragraph: ({children}) => <h2 className="text-2xl"><b>{children}</b></h2>}}/>
      <PrismicRichText field={collaboratorSlice.primary.job}/>
    </Box>
  )
})
const ModalManager: FC<{
  modalContent: any
  opened: boolean
  onClose: () => void
}> = ({modalContent, opened, onClose}) => {
  if (!modalContent) return null

  const arrivalDateRaw = modalContent.primary.arrival_date && new Date(modalContent.primary.arrival_date)
  const formattedDate = arrivalDateRaw && new Intl.DateTimeFormat(
    "fr-FR",
    {month: "long", year: "numeric"}
  ).format(new Date(arrivalDateRaw))


  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      transitionProps={{transition: 'fade', duration: 150}}
      size="100%"
      overlayProps={{blur: 3}}
    >
      {modalContent && (
        <Box className="rounded-xl shadow-2 sm:p-7">
          <Box className="flex flex-col gap-4">
            <Box className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <Box
                className="overflow-hidden rounded-xl max-width: 200px max-height: 200px width: 200px height: 200px">
                <PrismicImage field={modalContent.primary.photo}/>
              </Box>
              <PrismicRichText field={modalContent.primary.name} components={{
                paragraph: ({children}) => <h2 className="text-4xl"><b>{children}</b></h2>
              }}/>
              <PrismicRichText field={modalContent.primary.job}/>
              {formattedDate && <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>}
            </Box>
            <PrismicRichText field={modalContent.primary.description}/>
          </Box>
        </Box>
      )}
    </Modal>
  )
}

const processContent: (contents: any[], count: number) => {content: any}[] = (contents: any[], count: number) => (
  contents.map(({content}) => ({
    content: content.map((block: any) => ({
      ...block,
      text: block.text.replace("{{count}}", count.toString()),
    })),
  }))
)

export default function NousConnaitre({page, employees}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page?.data) return null
  const [modalContent, setModalContent] = useState<any>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const handleOpenModal = (content: any) => {
    setModalContent(content)
    open()
  }
  const handleCloseModal = () => {
    close()
    setTimeout(() => setModalContent(null), 150)
  }
  const components = React.useMemo(() => ({
    collaborators: (slice: any) => <Collaborator slice={slice} openModal={() => handleOpenModal(slice.slice)} />,
    heading2: ({children}: {children: any}) => <h2 className="text-5xl">{children}</h2>,
    paragraph: ({children}: {children: any}) => <h2 className="text-lg">{children}</h2>
  }), [handleOpenModal])



  const {hero, content: contents} = page.data
  const [{title, catchphrase, image} = {}] = hero || []
  const [{data: {slices} = {slices: []}}] = employees || [{data: {slices: []}}]
  const count = slices.length
  const contentWithCount = processContent(contents, count)

  return (
    <Box id="nous-connaitre-section" className={nousConnaitrePageCVA.box()}>
      <ModalManager modalContent={modalContent} opened={opened} onClose={handleCloseModal}/>
      <Box className={nousConnaitrePageCVA.hero()}>
        <header>
          <Container className={nousConnaitrePageCVA.title()}>
            <h1>{title}</h1>
            <Text className={nousConnaitrePageCVA.catchphrase()}>
              {catchphrase}
            </Text>
          </Container>
          <Box className={nousConnaitrePageCVA.heroImageContainer()}>
            <PrismicNextImage
              field={image}
              className={nousConnaitrePageCVA.heroImage()}
            />
            <Box className={nousConnaitrePageCVA.heroImageFilter()}/>
          </Box>
        </header>
      </Box>
      <Container className={nousConnaitrePageCVA.content()}>
        <section>
          <Space h="xl"/>
          <Space h="xl"/>
          {contentWithCount.map(({content}, index) => (
            <Box key={index} className={nousConnaitrePageCVA.paragraph()}>
              <PrismicRichText field={content} components={components}/>
            </Box>
          ))}
        </section>
        <Space h="xl"/>
        <Space h="xl"/>
      </Container>
      <section className="mx-3 xs:mx-4 grid items-start gap-x-4 gap-y-12 text-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <SliceZone slices={slices} components={components} key={slices.map(slice => slice.id).join('-')}/>
      </section>
      <Space h="xl"/>
      <Space h="xl"/>
    </Box>
  )
}

export async function getStaticProps({previewData}: GetStaticPropsContext) {
  const client = createClient({previewData})
  const [nav, footer, page, employees] = await Promise.all([
    client.getSingle("menu"),
    client.getSingle("footer"),
    client.getSingle("nous_connaitre"),
    client.getAllByType("collaborators")
  ])

  return {
    props: {nav, footer, page, employees}
  }
}
