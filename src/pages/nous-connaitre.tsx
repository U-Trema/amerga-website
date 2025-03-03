import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";
import { Box, Container, Space, Text } from "@mantine/core";
import { nousConnaitrePageCVA } from "@/styles/page.styles";
import React, { FC } from "react";
import { PrismicImage, PrismicRichText, SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";


const Collaborator: FC<{ slice: any }> = ({ slice }) => (
  <Box className="flex flex-col items-center overflow-hidden">
    <Box className="w-full h-full max-w-[115px] max-h-[115px] rounded-xl overflow-hidden">
      <PrismicImage field={slice.primary.photo} />
    </Box>
    <PrismicRichText field={slice.primary.name} components={{ paragraph: ({ children }) => <h2 className="text-2xl"><b>{children}</b></h2> }}/>
    <PrismicRichText field={slice.primary.job} />
  </Box>
);
const components = {
  collaborators: Collaborator,
  heading2: ({ children }) => <h2 className="text-5xl">{children}</h2>,
  paragraph: ({ children }) => <h2 className="text-lg">{children}</h2>
};

const processContent = (contents: any[], count: number) => (
  contents.map(({ content }) => ({
    content: content.map((block: any) => ({
      ...block,
      text: block.text.replace("{{count}}", count.toString()),
    })),
  }))
);

export default function NousConnaitre({page, employees,}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!page?.data) return null;

  const { hero, content: contents } = page.data;
  const [{title, catchphrase, image} = {}] = hero || []
  const [{data: {slices} = { slices: [] }}] = employees || [{ data: { slices: [] }}];
  const count = slices.length;
  const contentWithCount = processContent(contents, count);

  return (
    <Box id="nous-connaitre-section" className={nousConnaitrePageCVA.box()}>
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
            <Box className={nousConnaitrePageCVA.heroImageFilter()} />
          </Box>
        </header>
      </Box>
      <Container className={nousConnaitrePageCVA.content()}>
        <section>
          <Space h="xl" />
          <Space h="xl" />
          {contentWithCount.map(({ content }, index) => (
            <Box key={index} className={nousConnaitrePageCVA.paragraph()}>
              <PrismicRichText field={content} components={components}/>
            </Box>
          ))}
        </section>
        <Space h="xl" />
        <Space h="xl" />
      </Container>
      <section className="mx-3 xs:mx-4 grid items-start gap-x-4 gap-y-12 text-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <SliceZone slices={slices} components={components} />
      </section>
      <Space h="xl" />
      <Space h="xl" />
    </Box>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const [nav, footer, page, employees] = await Promise.all([
    client.getSingle("menu"),
    client.getSingle("footer"),
    client.getSingle("nous_connaitre"),
    client.getAllByType("collaborators"),
  ]);

  return {
    props: {nav, footer, page, employees}
  };
}
