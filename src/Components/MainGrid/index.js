import styled from "styled-components";

const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;

  .profile {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }

  @media (min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-gap: 12px;
    grid-template-areas: 'profileArea welcomeArea profileRelationsArea';
    grid-template-columns: 160px 1fr 312px;
  }

`;


export default MainGrid;