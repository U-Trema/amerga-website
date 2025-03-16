import React, {FC, useState} from 'react';
import {mobileNavCVA} from "@/libs/ui/nav/mobilenav.classes";
import Link from "next/link";
import {linkResolver} from "@/prismicio";
import {ArrowDown} from "@/libs/ui/icons/ArrowDown";
import {Flex} from "@mantine/core";
import {PrismicNextImage} from "@prismicio/next";

type Props = {
  nav: any;
  assurances_link: any;
}

const linkClass = 'py-8'

const MobileNav: FC<Props> = ({ nav, assurances_link }) => {
  const [showAssurances, setShowAssurances] = useState(false)

  const toggleAssurances = () => setShowAssurances(!showAssurances)

  return (
    <div className={mobileNavCVA.root()}>
      <ul>
        <li className={linkClass}>
          <Link href={linkResolver(nav.data.home_bis)}>{nav.data.home_bis.text}</Link>
        </li>
        <li className={linkClass}>
          <Flex direction='column'>
            <Flex justify='space-between' align='center' onClick={toggleAssurances} className='select-none'>
              {nav.data.assurances_bis[0].label}
              <ArrowDown />
            </Flex>

            <ul className='pl-32 select-none' style={{display: showAssurances ? 'block' : 'none'}}>
              {assurances_link?.data?.assurances_link?.map((link: any, index: number) => {
                return (
                  <li key={index} className='py-[8px] font-medium'>
                    <Link href={linkResolver(link.link)}>
                      <Flex gap={10}>
                        <PrismicNextImage field={link.icone} width={24} />
                        <p className='text-sm'>{link.link.text}</p>
                      </Flex>
                      <p className='pl-[34px] font-normal text-xs'>{link.description}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Flex>

        </li>
        <li className={linkClass}>
          <Link href={linkResolver(nav.data.contact_bis)}>
            {nav.data.contact_bis.text}
          </Link>
        </li>
        <li className={linkClass}>
          <Link href={linkResolver(nav.data.nous_connaitre_bis)}>
            {nav.data.nous_connaitre_bis.text}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
