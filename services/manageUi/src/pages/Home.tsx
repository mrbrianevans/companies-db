import {Button, TextInput} from "@mantine/core";
import {randomId} from "@mantine/hooks";

function Home() {

  return (<div>
      Do you already have an API key?

<div style={{margin: '1rem 0', border: '1px solid black'}}>
      Yes?
      <TextInput label={"Enter your key here"} placeholder={randomId()}/>
  </div>

      <div style={{margin: '1rem 0', border: '1px solid black'}}>

      No?
      <Button>Create API key</Button>
    </div>
</div>
  )
}

export default Home
