import {Title, Text, Stepper, Kbd, Code, Container} from "@mantine/core";
import {NavLink} from "react-router-dom";
import {useState} from "react";

function Home() {
  const [active, setActive] = useState(0);
  return (
<Container>

  <Title order={1}>Welcome to Companies DB</Title>
  <Text>A drop-in replacement API for Companies House public data endpoints.</Text>

  <Stepper active={active} onStepClick={setActive} breakpoint={'sm'} my={'md'}>
    <Stepper.Step label={'Create API key'} description={'To authenticate requests'}>
      <NavLink to={'key'}>Manage API key</NavLink>
    </Stepper.Step>
    <Stepper.Step label={'Test API endpoints'} description={'Try requesting some endpoints'}>
      <NavLink to={'tester'}>Open API tester</NavLink>
    </Stepper.Step>
    <Stepper.Step label={'Drop in new URL'} description={'Replace API base URL in your app'}>
      <div>
        <Kbd>Ctrl + F</Kbd> <Code>stream.companieshouse.gov.uk</Code>
      </div>
      <div>
        <Kbd>Ctrl + R</Kbd> <Code>companiesdb.co.uk</Code>
      </div>
    </Stepper.Step>

  </Stepper>

</Container>
  )
}

export default Home
