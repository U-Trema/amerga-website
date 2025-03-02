import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {createClient} from "@/prismicio";
import {Box, Container, Space, Text} from "@mantine/core";
import {nousConnaitrePageCVA} from "@/styles/page.styles";
import React from "react";
import {PrismicImage, PrismicRichText, SliceZone} from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

const components = {
  collaborators: (props: any) => (
    <Box className={'flex flex-col items-center overflow-hidden'}>
      <Box className={'w-full h-full max-w-[115px] max-h-[115px] rounded-xl overflow-hidden'}>
        <PrismicImage field={props.slice.primary.photo}/>
      </Box>
      <PrismicRichText field={props.slice.primary.name}/>
      <PrismicRichText field={props.slice.primary.job}/>
    </Box>
  ),
};

export default function NousConanitre({page, employees}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page.data) return null

  const {hero, content: contents} = page.data
  const [{title, catchphrase, image} = {}] = hero || []
  const [{data: {slices} = { slices: [] }}] = employees || [{ data: { slices: [] }}];
  const count = slices.length

  const contentWithCount = contents.map(({content}) => ({
    content: content.map((originalValue: any) => ({
        ...originalValue,
        text: originalValue.text.replace('{{count}}', count.toString())
      }))
    })
  );

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
      </Container>
      <section className={'mx-3 xs:mx-4 grid items-start gap-x-4 gap-y-12 text-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}>
        <SliceZone slices={slices} components={components} />
      </section>
      <Space h='xl' />
      <Space h='xl' />
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
