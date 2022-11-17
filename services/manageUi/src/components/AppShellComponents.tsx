

import React from 'react';
import {Footer, Header, Navbar, Text} from "@mantine/core";


export const ApplicationHeader: React.FC = (props) => (
  <Header height={60}>
    <h1>Companies Database</h1>
  </Header>
);


export const ApplicationFooter: React.FC = (props) => (
  <Footer height={60}>
    <p>This website was made by Brian Evans</p>
  </Footer>
);


export const ApplicationNavbar = () => (
  <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
    <Text>Application navbar</Text>
  </Navbar>
);

