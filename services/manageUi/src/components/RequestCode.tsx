import React from 'react';
import {Code, Tabs} from "@mantine/core";
import {getAuthorizationHeader} from "../logic/callApi.js";
import {Prism} from "@mantine/prism";


type RequestCodeProps = {
  url: string,
  apiKey: string
}

const RequestCode: React.FC<RequestCodeProps> = (request) => (
  <Tabs orientation="horizontal" defaultValue='HTTP' my='sm'>
    <Tabs.List position="right">
      <Tabs.Tab value={'HTTP'}>HTTP</Tabs.Tab>
      <Tabs.Tab value={'cURL'}>cURL</Tabs.Tab>
      <Tabs.Tab value={'JavaScript'} color='yellow'>JavaScript</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value={'HTTP'}>
      <Code block my={'md'}>{`GET ${request.url}\nAuthorization: ${getAuthorizationHeader(request.apiKey)}`}</Code>
    </Tabs.Panel>
    <Tabs.Panel value={'cURL'}>
      <Code block my={'md'}>{`curl -u ${request.apiKey}: ${request.url}`}</Code>
    </Tabs.Panel>
    <Tabs.Panel value={'JavaScript'}>
      <Prism language={'javascript'} my={'md'}>{
        `const headers = {Authorization: '${getAuthorizationHeader(request.apiKey)}'};
const response = await fetch('${request.url}', {headers});
const resource = await response.json();`
      }</Prism>
    </Tabs.Panel>
  </Tabs>
);

export default RequestCode;
