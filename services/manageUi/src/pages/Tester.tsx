import {NavLink} from "react-router-dom";
import {Prism} from "@mantine/prism";
import {Alert, Button, Code, Container, TextInput} from "@mantine/core";
import {useRecoilState} from "recoil";
import {apiKeysState} from "../state/ApiKey.js";
import {callApi} from "../logic/callApi.js";
import {useInputState} from "@mantine/hooks";
import {useState} from "react";

function Tester() {

  const [apiKeys] = useRecoilState(apiKeysState)
  const [json, setJson] = useState(undefined)
  const [error, setError] = useState<Error|undefined>(undefined)
  const [path, setPath] = useInputState('')
  function makeRequest(){
    if(apiKeys) callApi(path, window.location.origin, apiKeys[0].key).then(response=>setJson(response)).catch(e=>setError(e))
  }

  return (<Container>
Here you can test the API.
      <div>
      Your API key is: <Code>{apiKeys[0].key}</Code>
      </div>

      <TextInput label={'URL path'} placeholder={'/company/06743114'} value={path} onChange={setPath}/>
      <Button onClick={makeRequest}>Request</Button>
      {error && <Alert title="Error calling API" color="red"><b>{error.name}</b> {error.message}</Alert>}
      {/*{json && <Code block>{JSON.stringify(json, null, 2)}</Code>}*/}
      {json && <Prism language={'json'}>{JSON.stringify(json, null, 2)}</Prism>}

</Container>
  )
}

export default Tester
