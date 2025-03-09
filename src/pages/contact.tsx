import React from "react"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next"
import {createClient} from "@/prismicio"
import {Box, Container, Space} from "@mantine/core"
import {PrismicRichText, SliceZone} from "@prismicio/react"
import {contactPageCVA} from "@/styles/page.styles"
import Localisation from "@/slices/Localisation"

const components = {
  localisation: Localisation,
}

export default function Contact({page}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {titre: title, content, slices} = page.data

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
        <Container fluid className={contactPageCVA.root()}>
        <section>
          <Space h='xl'/>
          <Space h='xl'/>
          <Box className={contactPageCVA.info()}>
            {content.map(({info}, index: number) => (
              <>
                <PrismicRichText key={index} field={info}/>
                <Space h='xl'/>
              </>
            ))}
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
  const document = await client.getSingle("menu")
  const footer = await client.getSingle("footer")
  const page = await client.getSingle('contact')

  return {
    props: {
      nav: document,
      footer,
      page
    },
  }
}
