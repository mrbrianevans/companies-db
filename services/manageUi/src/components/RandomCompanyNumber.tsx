import {Button,  Group} from '@mantine/core';
import React, {useState} from 'react';
import CopyableCode from "./CopyableCode.js";

type RandomCompanyNumberProps = {

}

async function fetchCompanyNumber(){
  if(window.location.origin !== 'https://companiesdb.co.uk') return ['07048732']
  const res = await fetch('https://companies.stream/events/randomCompanyNumbers')
  const companyNumbers = await res.json()
  return companyNumbers[0]
}

const RandomCompanyNumber: React.FC<RandomCompanyNumberProps> = (props) => {
const [companyNumber, setCompanyNumber] = useState<string>()
  return (
    <Group spacing={'sm'}>
      <Button onClick={()=>fetchCompanyNumber().then(setCompanyNumber)}>Random company number</Button>
      {companyNumber && <div style={{display:'inline-flex', gap: '10px', flexWrap: 'wrap'}}>
          <CopyableCode value={companyNumber}/>
          <CopyableCode value={'/company/'+companyNumber}/>
          <CopyableCode value={'/company/'+companyNumber+'/persons-with-significant-control'}/>
      </div>}
    </Group>
  );
};

export default RandomCompanyNumber;
