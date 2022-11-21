import {Button,  Group} from '@mantine/core';
import React, {useState} from 'react';
import CopyableCode from "./CopyableCode.js";

type RandomCompanyNumberProps = {

}

async function fetchCompanyNumber(){
  const res = await fetch('https://companies.stream/events/randomCompanyNumbers')
  const companyNumbers = await res.json()
  return companyNumbers[0]
}

const RandomCompanyNumber: React.FC<RandomCompanyNumberProps> = (props) => {
const [companyNumber, setCompanyNumber] = useState<string>()
  return (
    <Group spacing={'sm'}>
      <Button onClick={()=>fetchCompanyNumber().then(setCompanyNumber)}>Random company number</Button>
      {companyNumber && <CopyableCode value={companyNumber}/>}
    </Group>
  );
};

export default RandomCompanyNumber;
