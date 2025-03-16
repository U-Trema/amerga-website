import React, {FC, ReactNode} from 'react'
import {Nav} from "@/libs/ui/nav/Nav"
import {Footer} from "@/libs/ui/footer/Footer"
import {FooterDocument, MenuDocument} from "@/../prismicio-types"


export const Layout: FC<{children: ReactNode, nav: MenuDocument<string>, footer: FooterDocument<string>, assurances_link: any}> = ({children, nav, footer, assurances_link}) => {
  return (
    <main>
      <Nav nav={nav} assurances_link={assurances_link} />
      {children}
      <Footer footer={footer} />
    </main>
  )
}
