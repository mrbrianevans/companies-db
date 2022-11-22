import {NavLink} from "react-router-dom";
import {Prism} from "@mantine/prism";
import {
  Alert,
  Button,
  Code,
  Container,
  TextInput,
  Title,
  Text,
  NativeSelect,
  Select,
  Divider,
  Group,
  Badge, Progress, RingProgress
} from "@mantine/core";
import {useRecoilState} from "recoil";
import {ApiKey, apiKeysState} from "../state/ApiKey.js";
import {ApiResponse, callApi, getAuthorizationHeader} from "../logic/callApi.js";
import {useInputState} from "@mantine/hooks";
import {useState} from "react";
import RandomCompanyNumber from "../components/RandomCompanyNumber.js";

// some basic validation to prevent erroneous requests
function validUrl(url: string){
  return /^\/?(company|officers|search)/.test(url)
}
function getStatusColor(status: number){
  if(100 <= status && status < 200) return 'blue'
  else if(200 <= status && status < 300) return 'green'
  else if(300 <= status && status < 400) return 'blue'
  else if(400 <= status && status < 500) return 'orange'
  else if(500 <= status && status < 600) return 'red'
}
function getRateLimitReset(rateLimitReset: string){
  const resetMs = parseInt(rateLimitReset) * 1000
  return resetMs - Date.now()
}

function Tester() {

  const [apiKeys] = useRecoilState(apiKeysState)
  const [selectedKey, setSelectedKey] = useState<ApiKey|undefined>(undefined)
  const [response, setResponse] = useState<ApiResponse>()
  const [error, setError] = useState<Error|undefined>()
  const [path, setPath] = useInputState('')
  const [request, setRequest] = useState<{key:string, url: string}>()
  function makeRequest(){
    if(selectedKey) {
      setRequest({key: selectedKey.key, url: new URL(path, selectedKey.baseUrl).toString()})
      callApi(path, selectedKey.baseUrl, selectedKey.key)
        .then(response => setResponse(response)).then(()=>setError(undefined))
        .catch(e => {
          setError(e)
          setResponse(undefined)
        })
    }
  }

  return (<Container>
      <Title order={1}>API Tester</Title>
      <Text color={'dimmed'}>Send authenticated requests to an API.</Text>

      <Title order={2} mt={'xl'}>Choose API key to use</Title>
      <Select data={apiKeys.map(k=>({value: k.key, label: k.name, group: k.baseUrl}))} value={selectedKey?.key??null} onChange={k=>setSelectedKey(apiKeys.find(key=>key.key === k))}/>

      {selectedKey ? <div>
          <Text>Server URL: <Code>{selectedKey?.baseUrl}</Code></Text>
          <Text>API key: <Code>{selectedKey?.key}</Code></Text>

          <Divider my={'md'}/>

        <RandomCompanyNumber/>

          <Title order={2} mt={'xl'}>Send request</Title>
          <Group style={{alignItems: 'end'}}>
            <TextInput label={'URL path'} placeholder={'/company/06743114'} value={path} onChange={setPath} style={{flexGrow: 1}}/>
            <Button onClick={makeRequest} disabled={!validUrl(path)}>Request</Button>
          </Group>

          {request && <Code block my={'md'}>{`GET ${request.url}\nAuthorization: ${getAuthorizationHeader(request.key)}`}</Code>}
          {request && <Prism language={'javascript'} my={'md'}>{
`const headers = {Authorization: '${getAuthorizationHeader(request.key)}'};
const response = await fetch('${request.url}', {headers});
const resource = await response.json();`
          }</Prism>}
          {error && <Alert title="Error calling API" color="red"><b>{error.name}</b> {error.message}</Alert>}
          {response && <div>
              <Group>
                  <Badge color={getStatusColor(response.status)} radius={'xs'} size={'lg'}>Status {response.status} {response.statusText}</Badge>
                {response.headers.get('content-type') && <Badge radius={'xs'} size={'lg'} color={response.isJson?'green':'gray'}>{response.headers.get('content-type')}</Badge>}
                  <Badge radius={'xs'} size={'lg'} color={response.duration < 100 ?'green':'orange'}>{response.duration} milliseconds</Badge>
              </Group>
            {typeof response.headers.get('x-ratelimit-remain') === 'string' &&
                <Progress size={'xl'} my={'sm'}
                          value={parseInt(response.headers.get('x-ratelimit-remain') ?? '0') / parseInt(response.headers.get('x-ratelimit-limit') ?? '600') * 100}
                          label={`${response.headers.get('x-ratelimit-remain')}/${response.headers.get('x-ratelimit-limit')} remaining`}/>
            }
            {/* todo: this should be a "loader" style indicator, showing the time left before the rate limit resets */}
            {/*{typeof response.headers.get('x-ratelimit-reset') === 'string' &&*/}
            {/*    <RingProgress size={120} my={'sm'}*/}
            {/*              sections={[]}*/}
            {/*              label={`Resets in ${getRateLimitReset(response.headers.get('x-ratelimit-reset')??'')}s`}/>*/}
            {/*}*/}
              <Prism language={'json'}>{response.isJson ? JSON.stringify(JSON.parse(response.body), null, 2) : response.body||'<empty response body>'}</Prism>
          </div>
              }
      </div> :
      <div>You must select an API key before you can make any requests.</div>}

</Container>
  )
}

export default Tester
