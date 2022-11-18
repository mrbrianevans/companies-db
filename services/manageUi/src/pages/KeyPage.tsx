import React from 'react';
import {
  Badge,
  Button,
  Code,
  Container,
  TextInput,
  Title,
  Text,
  Table,
  Group,
  CopyButton,
  ActionIcon,
  NativeSelect, Flex
} from "@mantine/core";
import {useRecoilState} from "recoil";
import {apiKeysState} from "../state/ApiKey.js";
import {useClipboard, useInputState} from "@mantine/hooks";
import {CheckIcon, CopyIcon, PlusIcon, TrashIcon} from '@radix-ui/react-icons'
import { requestNewKey } from '../logic/requestNewKey.js';

type KeyPageProps = {

}

const KeyPage: React.FC<KeyPageProps> = (props) => {
  const [apiKeys, setApiKeys] = useRecoilState(apiKeysState)
  const [enteredKey, setEnteredKey] = useInputState('')
  const [enteredName, setEnteredName] = useInputState('API Key 1')
  const [enteredNameAdded, setEnteredNameAdded] = useInputState('Added API Key 1')
  const [addedUrl, setAddedUrl] = useInputState(window.location.origin)

  async function createKey(name: string){
    const {key} = await requestNewKey()
    setApiKeys(prev=>prev.filter(k=>k.key !== key).concat({name, key, baseUrl: window.location.origin, created: new Date().toISOString()}))
  }
  function addKey({name, key, url}: {name:string, key:string, url:string}){
    setApiKeys(prev=>prev.filter(k=>k.key !== key).concat({name, key, baseUrl: url}))
  }
  return (
    <Container>
      <Title order={1}>API key management</Title>
      <Text color={'dimmed'} size={'sm'}>Requests must be authenticated with an API key.</Text>

      <Title order={2} mt={'xl'}>Your API keys</Title>
      <Table >
        <thead>
        <tr>
          <th>Name</th>
          <th>URL</th>
          <th>Key</th>
          <th>Created</th>
          <th><TrashIcon/></th>
        </tr>
        </thead>
        <tbody>
        {
          apiKeys.map(k=><tr key={k.key}>
            <td>{k.name}</td>
            <td>{k.baseUrl}</td>
            <td>
              <Flex style={{alignItems: 'center'}}>
              <Code style={{whiteSpace: 'nowrap'}} color={'blue'}>{k.key}</Code>
                <CopyButton value={k.key}>
                  {({ copied, copy }) => (
                    <ActionIcon color={'blue'} onClick={copy}>
                      {copied ? <CheckIcon/> : <CopyIcon/>}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Flex>
            </td>
            <td>{k.created ? new Date(k.created).toLocaleDateString('en-GB') : ''}</td>
            <td>
              <Group spacing={'xs'}>
                <ActionIcon color={'red'} onClick={()=>setApiKeys(prev=>prev.filter(key=>key.key !== k.key))}><TrashIcon/></ActionIcon>
              </Group>
            </td>
          </tr>)
        }
        </tbody>
      </Table>


      <Title order={2} mt={'xl'}>Create a new key</Title>
      <Group style={{alignItems: 'end'}}>
        <TextInput label={'Name'} placeholder={'My API key name'} style={{flexGrow: 1}} value={enteredName} onChange={setEnteredName}/>
        <Button color={'green'} disabled={enteredName.trim() === ''} onClick={()=>createKey(enteredName)}>Create</Button>
      </Group>

      <Title order={2} mt={'xl'}>Add an existing key</Title>
      <Group style={{alignItems: 'end'}}>
        <TextInput label={'Name'} placeholder={'My Added Key'} value={enteredNameAdded} onChange={setEnteredNameAdded}/>
        <TextInput label={'API key'} placeholder={'4294dd5f-1731-4cd6-abf3-6f886200516f'} style={{flexGrow: 1}} value={enteredKey} onChange={setEnteredKey}/>
        <NativeSelect data={['https://api.company-information.service.gov.uk', window.location.origin]} label={'Base URL'}  value={addedUrl} onChange={setAddedUrl}/>
        <Button color={'green'} disabled={enteredKey.length !== 36} leftIcon={<PlusIcon/>} onClick={()=>addKey({name: enteredNameAdded, key: enteredKey, url: addedUrl})}>Add</Button>
      </Group>





    </Container>
  );
};

export default KeyPage;
