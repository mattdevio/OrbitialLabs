/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import Header from '../components/Header';
import ThreeIconGroup from '../components/ThreeIconGroup';

/*=========================================
=            Landing Component            =
=========================================*/

const Landing = () => (
  <LandingMainContainer>
    <Header />
    <BackgroundGradient />
    <CenterStack>
      <CTAContainer>
        <CallButton />
      </CTAContainer>
      <DescriptionContainer>
        <DescriptionHeader />
        <ThreeIconGroup />
      </DescriptionContainer>
    </CenterStack>
  </LandingMainContainer>
);

export default Landing;

/*=====  End of Landing Component  ======*/

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
  justify-content: space-between;
  position: relative;
`;

const CTAContainer = styled.div`
  align-items: flex-end;
  height: 325px;
  display: flex;
`;

const CallButton = styled.button.attrs({
  children: 'GET STARTED TODAY',
})`
  background: #FF6077;
  border: 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  height: 75px;
  letter-spacing: 1px;
  width: 300px;
`;

const DescriptionContainer = styled.article`
  align-self: flex-end;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 350px;
  justify-content: space-evenly;
  width: 670px;
`;

const DescriptionHeader = styled.h3.attrs({
  children: 'A minimalist group messenger.',
})`
  color: #585858;
  font-weight: 300;
  letterSpacing: 1px;
  text-align: center;
`;
