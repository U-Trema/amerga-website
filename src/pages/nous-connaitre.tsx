import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {createClient} from "@/prismicio";
import {Box, Container, Space, Text} from "@mantine/core";
import {nousConnaitrePageCVA} from "@/styles/page.styles";
import React from "react";
import {PrismicRichText, SliceZone} from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

const components = {
  membership_slider: (props: any) => {
    console.log({props})
    return <Box>Membership slider</Box>
  },
  collaborators: (props: any) => {
    console.log({props})
    return <Box>Membership slider</Box>
  },
};

export default function NousConanitre({page, employees}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page.data) return null

  const {hero, content} = page.data
  const [{data: {slices} = {}}] = employees || [{ data: { slices: {} }}]
  console.log({ slices })
  const [{title, catchphrase, image} = {}] = hero || []
  console.log({ slices })

  const contentWithCount = content.map((content) => {
    return content
  });

  return (
    <Box id='nous-connaitre-section'>
      <Box className={nousConnaitrePageCVA.hero()}>
        <header>
          <Container className={nousConnaitrePageCVA.title()}>
            <h1>{title}</h1>
            <Text className={nousConnaitrePageCVA.catchphrase()}>{catchphrase}</Text>
          </Container>
          <Box className={nousConnaitrePageCVA.heroImageContainer()}>
            <Box className={nousConnaitrePageCVA.heroImageFilter()}></Box>
            <PrismicNextImage field={image} className={nousConnaitrePageCVA.heroImage()}/>
          </Box>

        </header>
      </Box>
      <Container className={nousConnaitrePageCVA.content()}>
        <section>
        <Space h='xl' />
        <Space h='xl' />
          {contentWithCount?.map(({content}: any, index: number) => (
            <Box key={index} className={nousConnaitrePageCVA.paragraph()}>
              <PrismicRichText field={content}/>
            </Box>
          ))}
        </section>
        <Space h='xl' />
        <Space h='xl' />
        <section>
          <SliceZone slices={slices} components={components} />
        </section>
        <Space h='xl' />
        <Space h='xl' />
      </Container>
    </Box>
  )
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu")
  const footer = await client.getSingle("footer")
  const page = await client.getSingle('nous_connaitre')
  const employees = await client.getAllByType("collaborators")

  return {
    props: {
      nav: document,
      footer,
      page,
      employees
    },
  };
}
