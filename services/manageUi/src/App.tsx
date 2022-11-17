

import React from 'react';
import {AppShell, MantineProvider, MantineThemeOverride} from "@mantine/core";
import {ApplicationFooter, ApplicationHeader, ApplicationNavbar} from "./components/AppShellComponents.js";
import {Outlet} from "react-router-dom";
import {RecoilRoot} from "recoil";

const theme: MantineThemeOverride = { fontFamily: 'Inter, sans-serif', fontFamilyMonospace: 'JetBrains Mono, monospace' }

export const App = (props: React.PropsWithChildren) => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <RecoilRoot>
      <AppShell header={<ApplicationHeader/>} footer={<ApplicationFooter/>} navbar={<ApplicationNavbar/>}>
        <Outlet/>
      </AppShell>
    </RecoilRoot>
  </MantineProvider>
);
