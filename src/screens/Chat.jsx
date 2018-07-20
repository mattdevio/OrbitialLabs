/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import Header from '../components/Header';

/*----------   Giphy API      ----------*/
import Giphy from '../components/Giphy';

/*=========================================
=            Chat Component            =
=========================================*/

const Chat = () => (
  <LandingMainContainer>
    <Header />
    <BackgroundGradient />
    <CenterStack>
      <DescriptionContainer>
        <DescriptionHeader />
          <Giphy search="dog" />
          <Giphy search="bird" />
      </DescriptionContainer>
    </CenterStack>
  </LandingMainContainer>
);

export default Chat;

/*=====  End of Chat Component  ======*/

const LandingMainContainer = styled.main`
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const BackgroundGradient = styled.div`
  background: linear-gradient(90deg, rgba(85,91,186,1) 0%, rgba(16,218,255,1) 100%);
  clip-path: polygon(0 0, 6000px 0, 1600px 75%, 0 100%);
  height: 90%;
  position: absolute;
  width: 100%;
`;

const CenterStack = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`;

const DescriptionContainer = styled.article`
  align-self: flex-end;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-evenly;
  width: 670px;
`;

const DescriptionHeader = styled.h3.attrs({
  children: 'No new posts.',
})`
  color: #585858;
  font-weight: 300;
  letterSpacing: 1px;
  text-align: center;
`;
