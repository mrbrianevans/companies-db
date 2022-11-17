import React from 'react';
import {Badge, Button, Container, TextInput} from "@mantine/core";

type KeyPageProps = {

}

const KeyPage: React.FC<KeyPageProps> = (props) => (
  <Container>
    Do you already have an API key?

    <div style={{margin: '1rem 0', border: '1px solid black'}}>
      Saved keys in localStorage:
      <Badge>0db671b1-4b47-4ce7-965a-1c641d7a4f46</Badge>
    </div>

    <div style={{margin: '1rem 0', border: '1px solid black'}}>
      Yes?
      <TextInput label={"Enter your key here"} placeholder={'0db671b1-4b47-4ce7-965a-1c641d7a4f46'}/>
    </div>

    <div style={{margin: '1rem 0', border: '1px solid black'}}>

      No?
      <Button>Create API key</Button>
    </div>
  </Container>
);

export default KeyPage;
