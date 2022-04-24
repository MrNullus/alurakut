import React from 'react';
import { useState, useEffect } from 'react';
import { ProfileRelationsBoxWrapper } from './../ProfileRelations';

function ProfileRelationsBox(props) {
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {props.title} ({props.relations.length})
      </h2>

      <ul>
       {props.relations.slice(0,6).map((item) => {
          return (
              <li key={item.id}>
                <a href={item.html_url}>  
                  <img src={`https://github.com/${item.login}.png`} />
                  <span>{item.login}</span>
                </a>
              </li> 
            )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )

}

export default ProfileRelationsBox;
