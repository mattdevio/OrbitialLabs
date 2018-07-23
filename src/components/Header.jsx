/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';


/*=========================================
=            Header Component            =
=========================================*/

const Header = () => (
  <HeaderContainer>
    <BrandContainer>
      <Logo src='./assets/images/logo.png'></Logo>
      <Name></Name>
    </BrandContainer>
    <AuthContainer>
      Links Go Here
    </AuthContainer>
  </HeaderContainer>
);

export default Header;

/*=====  End of Header Component  ======*/

const HeaderContainer = styled.nav`
  display: flex;
  height: 150px;
  justify-content: space-between;
  position: absolute;
  width: 100vw;
  z-index: 2;
`;

const BrandContainer = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  width: 450px;
`;

const Logo = styled.img`
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  height: 65px;
  width: 65px;
`;

const Name = styled.div.attrs({
  children: 'public square',
})`
  color: #fff;
  letter-spacing: 1px;
  font-size: 35px;
`;

const AuthContainer = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  width: 200px;
`;

const LinkDefault = `
  background: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  height: 50px;
  letter-spacing: 2px;
  width: 125px;
`;

const AuthLink = styled.button.attrs({
  children: 'sign in',
})`
  ${LinkDefault}
`;

const RegisterLink = styled.button.attrs({
  children: 'register',
})`
  ${LinkDefault}
`;

const SignOutLink = styled.button.attrs({
  children: 'sign out',
})`
  ${LinkDefault}
`;
