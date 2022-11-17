import React from 'react';
import {Badge, Button, Code, Container, TextInput} from "@mantine/core";
import {useRecoilState} from "recoil";
import {apiKeyState} from "../state/ApiKey.js";
import {useInputState} from "@mantine/hooks";

type KeyPageProps = {

}

const KeyPage: React.FC<KeyPageProps> = (props) => {
  const [apiKey, setApiKey] = useRecoilState(apiKeyState)

  const [enteredKey, setEnteredKey] = useInputState('')
  return (
    <Container>
      <div>
        Your API key is: <Code>{apiKey}</Code>
      </div>


      Do you already have an API key?

      <div style={{margin: '1rem 0', border: '1px solid black'}}>
        Saved keys in localStorage:
        <Badge>0db671b1-4b47-4ce7-965a-1c641d7a4f46</Badge>
      </div>

      <div style={{margin: '1rem 0', border: '1px solid black'}}>
        Yes?
        <TextInput label={"Enter your key here"} placeholder={'0db671b1-4b47-4ce7-965a-1c641d7a4f46'} value={enteredKey} onChange={setEnteredKey}/>
        <Button onClick={()=>setApiKey(enteredKey)} disabled={enteredKey.length !== 36}>Use key</Button>
      </div>

      <div style={{margin: '1rem 0', border: '1px solid black'}}>

        No?
        <Button>Create API key</Button>
      </div>
    </Container>
  );
};

export default KeyPage;
