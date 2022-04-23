import React from 'react';
import { Block } from 'baseui/block';
import { Camera, Manual, Smart } from '../components/addproduct';
import {Tabs, Tab} from 'baseui/tabs-motion';
import { useRouter } from 'next/router';


const Addproduct = () => {
  const router = useRouter();
  const [activeTabKey, setActiveTabKey] = React.useState('0');
  
  React.useEffect(() => {
    setActiveTabKey(router.query.t)
  }, [router]);

  return (
    <Block>
     <Tabs
       onChange={({ activeKey }) => {
         setActiveTabKey(activeKey);
          router.push(`?t=${activeKey}`)
       }}
       activeKey={activeTabKey}
     >
       <Tab title="Manual entry"><Manual /></Tab>
       <Tab title="Smart entry"><Smart /></Tab>
       <Tab title="Camera entry"><Camera /></Tab>
     </Tabs>
      
    </Block>
  );
}

export default Addproduct;
