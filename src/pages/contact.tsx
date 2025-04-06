import React, {Fragment, useMemo, useRef, useState} from "react"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next"
import {createClient} from "@/prismicio"
import Localisation from "@/slices/Localisation"
import {Box, Container, FloatingIndicator, Space, Tabs, TabsList, TabsPanel, TabsTab} from "@mantine/core"
import {contactPageCVA, homePageCVA, indicatorCVA, tabCVA, tabsListCVA} from "@/styles/page.styles"
import {PrismicRichText, SliceZone} from "@prismicio/react"
import {combineClasses} from "@/utils/combineClasses";


const components = {localisation: Localisation}

export default function Contact({page, documentsLies}: InferGetStaticPropsType<typeof getStaticProps>) {
  const rootRef = useRef<HTMLDivElement>(null)
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [activeTab, setActiveTab] = useState<string | null>('0')

  const {titre: title} = page.data
  const slices = documentsLies.flatMap(({data}) => (data as any).slices)

  const TabsTabList = useMemo(() => (
    slices.map(({primary}, index) => (
      <TabsTab
        key={index}
        value={`${index}`}
        ref={node => {controlsRefs.current[index] = node}}
        className={tabCVA.root({active: activeTab === `${index}`})}
      >
        {primary.title}
      </TabsTab>
    ))
  ), [slices, activeTab])
  const TabsPanelList = useMemo(() => (
    slices.map(({primary}, index) => (
      <TabsPanel key={index} value={`${index}`}>
        <Container fluid className={contactPageCVA.root()}>
          <section>
            <Space h='xl' />
            <Space h='xl' />
            <Box className={contactPageCVA.info()}>
              {primary.content.map(({info}:{info: any}, jindex: number) => (
                <Fragment key={jindex}>
                  <PrismicRichText field={info} />
                  <Space h="xl" />
                </Fragment>
              ))}
            </Box>
          </section>
          <section>
            <SliceZone slices={[slices[index]]} components={components} />
          </section>
          <Space h='xl'/><Space h='xl'/>
          <Space h='xl'/><Space h='xl'/>
        </Container>
      </TabsPanel>
    ))
  ), [slices])

  return (
    <Box id='Contact-section'>
      <Box className={combineClasses(contactPageCVA.root(), '!px-[16px]')}>
        <Container fluid className={contactPageCVA.root()}>
          <h1 className={contactPageCVA.title()}>{title}</h1>
        </Container>
      </Box>

      <Box className={contactPageCVA.bg()}>
        <Space h='xl' />
        <Tabs
          value={activeTab}
          defaultValue="0"
          variant="unstyled"
          onChange={setActiveTab}
        >
          <TabsList
            ref={rootRef}
            className={tabsListCVA.root()}
          >
            {TabsTabList}
            <FloatingIndicator
              target={activeTab ? controlsRefs.current[activeTab] : null}
              parent={rootRef.current}
              className={indicatorCVA.root({active: true})}
            />
          </TabsList>

          <div className={homePageCVA.root()}>
            {TabsPanelList}
          </div>
        </Tabs>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const [nav, assurances_link, footer, page] = await Promise.all([
    client.getSingle("menu"),
    client.getByUID('assurance_link', 'assurances_link'),
    client.getSingle("footer"),
    client.getSingle('contact')
  ])


  const documentLinks = Object.values(page.data)
    .filter((value) => (value as any)?.link_type === "Document")
    .map((value) => (value as any).type)
  const documentsLies = await Promise.all(documentLinks.map(link => client.getAllByType(link)))

  return {
    props: {
      nav,
      assurances_link,
      footer,
      page,
      documentsLies: documentsLies.flat()
    },
  }
}
