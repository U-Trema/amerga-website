import React, {FC} from 'react';
import {Nav} from "@/libs/ui/nav/Nav";

export const Layout: FC<any> = ({ children, nav }) => {
  return (
    <main>
      <Nav nav={nav} />

      {children}
    </main>
  );
};
