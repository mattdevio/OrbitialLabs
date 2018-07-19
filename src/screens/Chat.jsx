/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import Header from '../components/Header';

/*=========================================
=            Chat Component            =
=========================================*/

const Chat = () => (
  <LandingMainContainer>
    <Header />
    <h1>Welcome to Chat</h1>
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
