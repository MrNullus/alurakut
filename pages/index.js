import MainGrid from '../src/Components/MainGrid';
import Box from '../src/Components/Box';
import { ProfileRelationsBoxWrapper } from '../src/Components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommos';


function ProfileSidebar(props) {
  return (
    <Box>
      <img
        style={{ borderRadius: '8px' }}
        src={`https://github.com/${props.githubUser}.png`}
        alt=''
      />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'dev-gustavo-henrique';
  const pessoasFavoritas = [
    'juunegreiros', 'felipefialho', 
    'rafaballerini', 'omariosouto', 
    'peas', 'marcobrunodev'
  ];

  return (
    <>
      <AlurakutMenu />

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
        </div>

        <div
          className='profileRelationsArea'
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas Comunidades ({pessoasFavoritas.length}){' '}
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  )
}
