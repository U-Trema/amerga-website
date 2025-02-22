import { createClient } from "@/prismicio";
import {homepageCVA} from "@/styles/page.styles";
import {GetStaticPropsContext} from "next";
import HeroMosaicImages from "@/slices/HeroMosaicImages";

export default function Home({ home }: { nav: any; footer: any, home: any }) {
  return (
    <div className={homepageCVA.root()}>
      {home.data.slices?.map((slice: any, index: number) => (
        <HeroMosaicImages key={index} slice={slice} slices={home.data.slices} index={index} context='home-hero' />
      ))}
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu");
  const footer = await client.getSingle("footer");
  const home = await client.getSingle("home");

  return {
    props: {
      nav: document,
      footer,
      home
    },
  };
}
