import React, {FC} from 'react';
import {Nav} from "@/libs/ui/nav/Nav";
import {Footer} from "@/libs/ui/footer/Footer";

export const Layout: FC<any> = ({ children, nav, footer }) => {
  return (
    <main>
      <Nav nav={nav} />
      {children}
      <Footer footer={footer} />
    </main>
  );
};
