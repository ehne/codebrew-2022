import React from 'react';
import fs from 'fs';
import path, {join} from 'path';
import { Button } from 'baseui/button';
import { useDB } from 'react-pouchdb';
import {ListItem, ListItemLabel, ListHeading} from 'baseui/list';
import { useRouter } from 'next/router';
import { ParagraphSmall } from 'baseui/typography';
import { Block } from 'baseui/block';
import { styled } from 'baseui';
import { ChevronRight } from 'baseui/icon';
import {Drawer} from 'baseui/drawer';


const CopyrightText = styled(ParagraphSmall, ({$theme})=>({
  textAlign: 'center',
  marginTop: $theme.sizing.scale1000,
  color: $theme.colors.contentTertiary
}))

const Index = ({licenseInfo}) => {
  const [licenseIsOpen, setLicenseIsOpen] = React.useState(false);
  const db = useDB();
  const router = useRouter();

  return (
    <>
      <ListHeading
        heading="More options"
        maxLines={1}
      />
      <ListItem endEnhancer={() => <Button
        onClick={() => {
          if(confirm('Are you sure you want to delete all data?')){
            db.destroy();
            router.push('/')
          }
        }}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.negative,
              color: $theme.colors.contentOnColor
            })
          }
        }}
      >
        Delete Database
      </Button>}>
        <ListItemLabel>Delete Dabase</ListItemLabel>
      </ListItem>
      <ListItem endEnhancer={() => <Button onClick={()=>setLicenseIsOpen(true)}><ChevronRight/></Button>}>
        <ListItemLabel>View License Information</ListItemLabel>
      </ListItem>
      <CopyrightText>(c) 2022 TerrorBytes software</CopyrightText>

      <Drawer
        isOpen={licenseIsOpen}
        autoFocus
        onClose={() => setLicenseIsOpen(false)}
      >
        <div>{Object.keys(licenseInfo).map(k=>(
          <p key="k"><b><a href={licenseInfo[k].repository}>{k}</a></b>: {licenseInfo[k].publisher} {licenseInfo[k].licenses} </p>
        ))}</div>
      </Drawer>
    </>
  );
}

export async function getStaticProps() {
  const pathOfLicense = join(process.cwd(), 'license_info.json');
  const fileContents = fs.readFileSync(pathOfLicense, 'utf-8');

  return ({
    props: {
      licenseInfo: JSON.parse(fileContents)
    }
  })
}

export default Index;
