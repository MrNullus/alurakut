import React from 'react';
import MainGrid from '../src/Components/MainGrid';
import Box from '../src/Components/Box';
import { ProfileRelationsBoxWrapper } from '../src/Components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommos';


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

export default function Home() {
  const [ comunidades, setComunidades ] = React.useState([{
    id: new Date().toISOString(),
    title: "Eu odeio acordar cedo",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }]);

  const githubUser = 'dev-gustavo-henrique';
  // const comunidade = [
  //   'Alurakut', 'DevPorHobbie', 
  //   'MochileirosDoCodepen', 'DevSincero'
  // ];
  const pessoasFavoritas = [
    'juunegreiros', 'felipefialho', 
    'rafaballerini', 'omariosouto', 
    'peas', 'marcobrunodev'
  ];

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
              // console.log(dadosDoForm.get("title"));
              // console.log(dadosDoForm.get("image"));
              if (comunidades.length <= 5) {
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image')
                };
                
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);

              }

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
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunitys/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas Comunidades ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                for (let i = 0; i < 5; i++) {
                  return (
                    <li key={itemAtual}>
                      <a href={`/users/${itemAtual}`}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
