

import React from 'react';
import {AppShell, MantineProvider} from "@mantine/core";
import {ApplicationFooter, ApplicationHeader, ApplicationNavbar} from "./components/AppShellComponents.js";
import {Outlet} from "react-router-dom";

const theme = { fontFamily: 'Open Sans' }

export const App = (props: React.PropsWithChildren) => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <AppShell header={<ApplicationHeader/>} footer={<ApplicationFooter/>} navbar={<ApplicationNavbar/>}>
      <Outlet/>
    </AppShell>
  </MantineProvider>
);
