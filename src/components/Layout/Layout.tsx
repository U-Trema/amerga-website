import React, {FC, ReactNode} from 'react'
import {Nav} from "@/libs/ui/nav/Nav"
import {Footer} from "@/libs/ui/footer/Footer"
import {FooterDocument, MenuDocument} from "@/../prismicio-types"


export const Layout: FC<{children: ReactNode, nav: MenuDocument<string>, footer: FooterDocument<string>}> = ({children, nav, footer}) => {
  return (
    <main>
      <Nav nav={nav} />
      {children}
      <Footer footer={footer} />
    </main>
  )
}
