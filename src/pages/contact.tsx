import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {createClient} from "@/prismicio";
import {Box, Container, Space, Title} from "@mantine/core";
import {PrismicRichText} from "@prismicio/react";
import React from "react";
import {contactpageCVA} from "@/styles/page.styles";

export default function Contact({page}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {titre: title, content} = page.data

  return (
    <Box id='Contact-section'>
      <Box className={contactpageCVA.hero()}>
        <header>
          <Container  fluid className={contactpageCVA.root()}>
            <h1 className={contactpageCVA.title()}>{title}</h1>
            <Space h='xl'/>
          </Container>
        </header>
      </Box>
      <Container fluid className={contactpageCVA.root()}>
        <section>
          <Space h='xl'/>
          <Space h='xl'/>
          <Box className={contactpageCVA.info()}>
            {content.map(({info}, index: number) => (
              <>
                <PrismicRichText key={index} field={info}/>
                <Space h='xl'/>
              </>
            ))}
          </Box>
          <Space h='xl'/>
          <Space h='xl'/>
        </section>
      </Container>
    </Box>
  )
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu");
  const footer = await client.getSingle("footer");
  const page = await client.getSingle('contact')


  return {
    props: {
      nav: document,
      footer,
      page
    },
  };
}
