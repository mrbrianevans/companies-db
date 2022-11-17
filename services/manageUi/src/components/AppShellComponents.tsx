

import React from 'react';
import {Button, Footer, Header, Navbar, Text, Title} from "@mantine/core";
import {NavLink} from "react-router-dom";


export const ApplicationHeader: React.FC = (props) => (
  <Header height={60}>
    <Title><NavLink to={'/manage'}>Companies Database</NavLink></Title>
  </Header>
);


export const ApplicationFooter: React.FC = (props) => (
  <Footer height={60}>
    <div style={{display: 'grid', placeItems: 'center'}}>
      <Text color={'dimmed'}>This website was made by Brian Evans</Text>
    </div>
  </Footer>
);


export const ApplicationNavbar = () => (
  <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
    <Navbar.Section>
      <div style={{display: 'grid', gap: 5, alignItems: 'stretch'}}>
        <NavLink to={'key'}>API Key</NavLink>
        <NavLink to={'tester'}>Endpoint Tester</NavLink>

      </div>
    </Navbar.Section>
  </Navbar>
);

