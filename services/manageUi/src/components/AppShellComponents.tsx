

import React from 'react';
import {Badge, Button, Footer, Header, Navbar, Text, Title} from "@mantine/core";
import {NavLink} from "react-router-dom";
import styles from './AppShellComponents.module.scss'
import {useRecoilState} from "recoil";
import {apiKeysState} from "../state/ApiKey.js";


export const ApplicationHeader: React.FC = (props) => {
  const [apiKeys] = useRecoilState(apiKeysState)
  return (
    <Header height={60}>
      <div className={styles.headerContainer}>
        <Text size={40}><NavLink to={'/manage/'} style={{color: 'black', textDecoration: 'none'}}>Companies
          Database</NavLink></Text>
        {`${apiKeys.length} API keys loaded`}
      </div>
    </Header>
  );
};


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
        <NavLink to={'key'} className={({ isActive }) => `${styles.navbarLink} ${isActive? styles.active : ''}`}>API Key</NavLink>
        <NavLink to={'tester'} className={({ isActive }) => `${styles.navbarLink} ${isActive? styles.active : ''}`}>Endpoint Tester</NavLink>

      </div>
    </Navbar.Section>
  </Navbar>
);

