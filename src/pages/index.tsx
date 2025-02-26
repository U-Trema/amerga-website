import { createClient } from "@/prismicio";
import {homepageCVA} from "@/styles/page.styles";
import {GetStaticPropsContext} from "next";
import HeroMosaicImages from "@/slices/HeroMosaicImages";
import MembershipSlider from "@/slices/MembershipSlider";
import Collaborators from "@/slices/Collaborators";
import React from "react";
import CartesAssurances from "@/slices/CartesAssurances";
import {isFilled} from "@prismicio/client";
import Executives from "@/slices/Executives";

export default function Home({ home, collaborators, executiveManagers }: { nav: any; footer: any; home: any; collaborators: any, executiveManagers: any }) {
  console.log(home)
  console.log('e', executiveManagers)
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

        if (slice.slice_type === 'cartes_assurances') {
          return (
            <div className={homepageCVA.root()} key={slice.slice_type}>
              <CartesAssurances
                slice={slice}
                index={index}
                slices={home.data.slices}
                context='home-cartes-assurances'
              />
            </div>
          )
        }

        if (slice.slice_type === 'executives') {
          return (
            <Executives
              slice={slice}
              index={index}
              key={slice.slice_type}
              slices={home.data.slices}
              context='home-executives'
              executiveManagers={executiveManagers}
            />
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
  const executivesSlice = home.data.slices.find(slice => slice.slice_type === 'executives')

  // @ts-ignore
  const hasExecutiveManagers = isFilled.group(executivesSlice?.primary?.executives)
  // @ts-ignore
  const executivesIds = executivesSlice?.primary?.executives?.map(manager => manager.executives.id)
  const executives = hasExecutiveManagers ? await client.getByIDs(executivesIds) : []

  return {
    props: {
      nav: document,
      footer,
      home,
      collaborators,
      executiveManagers: executives,
    },
  };
}
