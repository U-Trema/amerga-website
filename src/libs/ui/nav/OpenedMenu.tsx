import React, {FC} from 'react';
import {menuCVA} from "@/libs/ui/nav/openedMenu.classes";
import {SimpleGrid} from "@mantine/core";
import MenuLink from '@/slices/MenuLink';
import Link from "next/link";
import {linkResolver} from "@/prismicio";

type Props = {
  data: any;
  links: any;
}

const OpenedMenu: FC<Props> = ({ data, links }) => {
  return (
    <section className={menuCVA.root()}>
      <div className='max-w-[1280px] mx-auto'>
        <SimpleGrid
          verticalSpacing={{ base: 48 }}
          cols={{ base: 3, md: 6 }}
          className='mx-auto p-16'
          component='nav'
          spacing='xl'
        >
          <div className='rounded-xl overflow-hidden'>
            <MenuLink slices={data?.slices1} slice={data?.slices1?.[0]} index={0} context='menu-card-link' />
          </div>

          {links?.data?.assurances_link?.map((link: any, index: number) => {
            return (
              <Link
                key={index}
                href={linkResolver(link.link)}
                className='uppercase font-bold text-xs hover:bg-soft-grey transition duration-300 rounded-xl overflow-hidden p-24 cursor-pointer h-[190px]'
                style={{ gridColumnStart: index % 5 === 0 ? '2' : 'initial' }}
              >
                <p className='h-[25%]'>{link.link.text}</p>
                <p className='text-sm font-normal normal-case mt-8'>{link.description}</p>
              </Link>
            )
          })}
        </SimpleGrid>
      </div>
    </section>
  );
};

export default OpenedMenu;
