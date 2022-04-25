//** Importações do React */
import React from 'react';
import { useState, useEffect } from 'react';

//** Lib para implementar Cookies com Next */
import nookies from 'nookies';
//** lib para implementar JWT */
import jwt from "jsonwebtoken";

//** Components */
import MainGrid from '../src/Components/MainGrid';
import Box from '../src/Components/Box';
import { ProfileRelationsBoxWrapper } from '../src/Components/ProfileRelations';
import ProfileSidebar from '../src/Components/ProfileSidebar/';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommos';
import ProfileRelationsBox from '../src/Components/ProfileRelationsBox/';


export default function Home(props) {
  const [ communities, setCommunities ] = useState([]);

  const githubUser = props.githubUser;
  // const comunidade = [
  //   'Alurakut', 'DevPorHobbie', 
  //   'MochileirosDoCodepen', 'DevSincero'
  // ];
  const pessoasFavoritas = [
    'juunegreiros', 'felipefialho', 
    'rafaballerini', 'omariosouto', 
    'peas', 'marcobrunodev'
  ];

  // 0 - Pegar o array com os dados do GitHub
  const [ followers, setFollowers ] = useState([]);
  useEffect(function() {
    // ! API GitHub
    fetch("https://api.github.com/users/dev-gustavo-henrique/followers")
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
      console.log(response);
      setFollowers(response);  
    });

    // ! API GraphQL
    fetch(
      'https://graphql.datocms.com/', 
      {
        method: 'POST',
        headers: {
          'Authorization': '680bca3cf81faa0e5b65aa7b6f1a42',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({"query": `
          query {
            allCommunities {
              id,
              title,
              imageUrl,
              creatorSlug
            }
          }
        `})
      }
    )
    .then((response) => response.json())
    .then((response) => {
      const communitiesFromDato = response.data.allCommunities;
      console.log(communitiesFromDato);

      setCommunities(communitiesFromDato);
    });

  }, []);

  // 1 - Criar um box que vai ter um map, baseado nos items do array que pegamos do GitHub


  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box> 
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              
              const dataFromForm = new FormData(e.target);

              const community = {
                title: dataFromForm.get('title'),
                dateOfCreation: new Date().toISOString(),
                imageUrl: dataFromForm.get('image'),
                creatorSlug: githubUser,
              };

              fetch(
                '/api/communities',
                {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(community),
                }
              )
              .then(async (response) => {
                const data = await response.json();
                const community = data.createdRecord;
                // console.log(data.createdRecord);
                const updatedCommunities = [...communities, community];
                setCommunities(updatedCommunities);
              });

            }}>
              <div>
                <input 
                  type="text" 
                  name="title"
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input 
                  type="url" 
                  name="image" 
                  placeholder="Coloque a URL para usarmos como capa"
                  aria-label="Coloque a URL para usarmos como capa"
                />
              </div>
              
              <button>
                Criar Comunidade
              </button>
            </form>

          </Box>

        </div>

        <div
          className='profileRelationsArea'
          style={{ gridArea: 'profileRelationsArea' }}
        >

          <ProfileRelationsBox title="Followers" relations={followers} />
  
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.slice(0,6).map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/communities/${item.id}`}>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas Favoritas da Comunidade({pessoasFavoritas.length})
            </h2>

            <ul>
            {pessoasFavoritas.slice(0,6).map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((response) => response.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, //* will be passed to the page component as props
  }
}
