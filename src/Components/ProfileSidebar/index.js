import React from 'react';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AluraCommos';
import Box from '../Box';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: '8px' }}
        src={`https://github.com/${props.githubUser}.png`}
        alt=''
      />
      <hr />

      <p>
        <a className='boxLink' href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default ProfileSidebar;
