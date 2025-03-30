import React, {useMemo, useState} from "react"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next"
import {createClient} from "@/prismicio"
import {Box, Container, FloatingIndicator, Space, Tabs, TabsList, TabsPanel, TabsTab} from "@mantine/core"
import {PrismicRichText, SliceZone} from "@prismicio/react"
import {contactPageCVA, homePageCVA} from "@/styles/page.styles"
import Localisation from "@/slices/Localisation"
import {cva} from "class-variance-authority";

const components = {localisation: Localisation}

const tabCVA = {
  root: cva(['rounded-[10px] !z-1 relative !font-semibold hover:!bg-grey-secondary'], {
    variants: {
      active: {
        true: '!bg-grey-secondary !outline-amerga-orange !outline-1',
        false: ''
      }
    }
  })
}

const indicatorCVA = {
  root: cva(['bg-transparent !rounded-[10px] z-0'], {
    variants: {
      active: {
        true: '!bg-grey-secondary',
        false: ''
      }
    }
  })
}

export default function Contact({page}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const {titre: title, content, slices} = page.data
  const contentElements = useMemo(() => content.map(({info}, index: number) => (
      <React.Fragment key={index}>
        <PrismicRichText field={info} />
        <Space h="xl" />
      </React.Fragment>
  )), [content])

  return (
    <Box id='Contact-section'>
      <Box className={contactPageCVA.hero()}>
        <header>
          <Container  fluid className={contactPageCVA.root()}>
            <h1 className={contactPageCVA.title()}>{title}</h1>
            <Space h='xl'/>
          </Container>
        </header>
      </Box>

      <Box className={contactPageCVA.bg()}>
        <Space h='xl'/>

        <Tabs
          value={value}
          defaultValue="1"
          variant="unstyled"
          onChange={setValue}
        >
          <TabsList
            ref={setRootRef}
            className='!rounded-[14px] !p-[4px] items-center self-center w-fit mx-auto mb-[40px] relative !gap-1'
            style={{ backgroundColor: '#F1EFE9' }}
          >
            <TabsTab value="1" ref={setControlRef('1')} className={tabCVA.root({ active: value === '1' })}>
              Chat
            </TabsTab>
            <TabsTab value="2" ref={setControlRef('2')} className={tabCVA.root({ active: value === '2' })}>
              Gallery
            </TabsTab>
            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={indicatorCVA.root({ active: true })}
            />
          </TabsList>

          <div className={homePageCVA.root()}>
            <TabsPanel value='1'>
              <p>Lorem ipsum dolor sit.</p>
            </TabsPanel>

            <TabsPanel value='2'>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </TabsPanel>
          </div>
        </Tabs>

        <Container fluid className={contactPageCVA.root()}>
          <section>
            <Space h='xl'/>
            <Space h='xl'/>
            <Box className={contactPageCVA.info()}>
              {contentElements}
            </Box>
          </section>
        </Container>
        <section>
          <SliceZone slices={slices} components={components}/>
        </section>
        <Space h='xl'/>
        <Space h='xl'/>
        <Space h='xl'/>
        <Space h='xl'/>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const nav = await client.getSingle("menu")
  const assurances_link = await client.getByUID('assurance_link', 'assurances_link');
  const footer = await client.getSingle("footer")
  const page = await client.getSingle('contact')

  return {
    props: {
      nav,
      assurances_link,
      footer,
      page
    },
  }
}
