import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {createClient} from "@/prismicio";
import {Box, Container, Space, Title} from "@mantine/core";
import {PrismicRichText} from "@prismicio/react";
import React from "react";
import {contactpageCVA} from "@/styles/page.styles";

export default function Contact({page}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {titre: title, content} = page.data
  console.log({content})

  return (
    <Container id='Contact-section' fluid className={contactpageCVA.root()}>
      <Box className={contactpageCVA.title()}>
        <Title>{title}</Title>
      </Box>
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
    </Container>
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
