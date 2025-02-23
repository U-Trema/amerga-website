import { createClient } from "@/prismicio";
import {homepageCVA} from "@/styles/page.styles";
import {GetStaticPropsContext} from "next";
import HeroMosaicImages from "@/slices/HeroMosaicImages";
import MembershipSlider from "@/slices/MembershipSlider";
import Collaborators from "@/slices/Collaborators";
import React from "react";

export default function Home({ home, collaborators }: { nav: any; footer: any; home: any; collaborators: any }) {
  console.log('_ home _', home)
  console.log('_ collab _', collaborators)

  return (
    <div>
      {home.data.slices?.map((slice: any, index: number) => {
        if (slice.slice_type === 'hero_mosaic_images') {
          return (
            <div className={homepageCVA.root()} key={slice.slice_type}>
              <HeroMosaicImages key='home-hero' slice={slice} slices={home.data.slices} index={index} context='home-hero'/>
            </div>
          );
        }

        if (slice.slice_type === 'membership_slider') {
          return (
            <React.Fragment key={`${slice.slice_type}__${index}`}>
              <MembershipSlider key={slice.slice_type} slice={slice} slices={home.data.slices} index={index} context='home-membership' />
              <Collaborators slice={collaborators[0]} index={index} slices={home.data.slices} context='home-collaborators' />
            </React.Fragment>
          )
        }
      })}
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })
  const document = await client.getSingle("menu");
  const footer = await client.getSingle("footer");
  const home = await client.getSingle("home");

  const collaborators = await client.getAllByType("collaborators");

  return {
    props: {
      nav: document,
      footer,
      home,
      collaborators
    },
  };
}
