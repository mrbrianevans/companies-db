import React from 'react';
import {ActionIcon, Code, CopyButton} from "@mantine/core";
import {CheckIcon, CopyIcon} from "@radix-ui/react-icons";

type CopyableCodeProps = {
  value: string
}

const CopyableCode: React.FC<CopyableCodeProps> = (props) => (
  <div style={{display: 'inline-flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
    <Code style={{whiteSpace: 'nowrap'}} color={'blue'}>{props.value}</Code><CopyButton value={props.value}>
    {({copied, copy}) => (
      <ActionIcon color={'blue'} onClick={copy}>
        {copied ? <CheckIcon/> : <CopyIcon/>}
      </ActionIcon>
    )}
  </CopyButton>
  </div>
);

export default CopyableCode;
