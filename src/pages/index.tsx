import { createClient } from "@/prismicio";
import {GetStaticPropsContext} from "next";
import HeroMosaicImages from "@/slices/HeroMosaicImages";
import Memberships from "@/slices/Memberships";
import Collaborators from "@/slices/Collaborators";
import React from "react";
import CartesAssurances from "@/slices/CartesAssurances";
import {isFilled} from "@prismicio/client";
import Executives from "@/slices/Executives";
import Numbers from "@/slices/Numbers";
import Contact from "@/slices/Contact";
import {Space} from "@mantine/core";

export default function Home({ home, collaborators, executiveManagers }: { nav: any; footer: any; home: any; collaborators: any, executiveManagers: any }) {
  return (
    <div>
      {home.data.slices?.map((slice: any, index: number) => {
        if (slice.slice_type === 'hero_mosaic_images') {
          return (
            <HeroMosaicImages key='home-hero' slice={slice} slices={home.data.slices} index={index} context='home-hero'/>
          );
        }

        if (slice.slice_type === 'membership_slider') {
          return (
            <React.Fragment key={`${slice.slice_type}__${index}`}>
              <Memberships key={slice.slice_type} slice={slice} slices={home.data.slices} index={index} context='home-membership' />
              <Collaborators slice={collaborators[0]} index={index} slices={home.data.slices} context='home-collaborators' />
            </React.Fragment>
          )
        }

        if (slice.slice_type === 'cartes_assurances') {
          return (
            <CartesAssurances
              key={slice.slice_type}
              slice={slice}
              index={index}
              slices={home.data.slices}
              context='home-cartes-assurances'
            />
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

        if (slice.slice_type === 'numbers') {
          return (
            <Numbers slice={slice} index={index} key={slice.slice_type} slices={home.data.slices} context='home-numbers' />
          )
        }

        if (slice.slice_type === 'contact') {
          return (
            <Contact slice={slice} index={index} slices={home.data.slices} context='home-contact' key={slice.slice_type} />
          )
        }
      })}

      <Space className='mt-80 md:mt-128' />
    </div>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({previewData})
  const document = await client.getSingle("menu");
  const assurances_link = await client.getByUID('assurance_link', 'assurances_link');
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
      assurances_link,
      footer,
      home,
      collaborators,
      executiveManagers: executives,
    },
  };
}
