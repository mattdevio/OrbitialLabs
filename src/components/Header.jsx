/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import * as routes from 'constants/routes';
import Storage from 'bin/LocalStorage';

/*=========================================
=            Header Component            =
=========================================*/

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: this.getRoutes(props.location.pathname),
    };
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.signUserOut = this.signUserOut.bind(this);
  }

  handleBrandClick() {
    const { history } = this.props;
    history.push(routes.LANDING);
  }

  getRoutes() {
    const newRoutes = {};
    switch (this.props.location.pathname) {
      case routes.LANDING:
        newRoutes[routes.AUTH] = 'login';
        break;
      case routes.AUTH:
        newRoutes[routes.REGISTER] = 'sign up';
        break;
      case routes.REGISTER:
        newRoutes[routes.AUTH] = 'login';
        break;
      case routes.CHAT:
        newRoutes[routes.LOGOUT] = 'sign out';
        break;
    }
    return newRoutes;
  }

  signUserOut() {
    const { history, logoutUser } = this.props;
    Storage.getInstance().setToken();
    logoutUser();
    if (history.onSignOut) history.onSignOut();
    history.push(routes.AUTH);
  }

  render() {
    const displayRoutes = this.getRoutes();
    return (
      <HeaderContainer>
        <BrandContainer onClick={ this.handleBrandClick }>
          <Logo />
          <Name>
            public square
          </Name>
        </BrandContainer>
        <NavigationContainer>
          {Object.keys(displayRoutes).map((key) => {

            if (key === routes.LOGOUT) {
              return (
                <SignOutBtn key={ key } onClick={ this.signUserOut }>
                  { displayRoutes[key] }
                </SignOutBtn>
              );
            }
            return (
              <NavLink key={ key } to={ key }>
                { displayRoutes[key] }
              </NavLink>
            );
          })}
        </NavigationContainer>
      </HeaderContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch({
    type: 'LOGOUT_USER',
  }),
});

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Header));

/*=====  End of Header Component  ======*/

const HeaderContainer = styled.header`
  position: relative;
  z-index: 1000;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 15px;
  height: 150px;
  box-sizing: border-box;
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 325px;
  cursor: pointer;
`;

const Logo = styled.img.attrs({
  src: './assets/images/logo.png',
})`
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  height: 65px;
  width: 65px;
`;

const Name = styled.h1`
  color: #fff;
  letter-spacing: 1px;
  font-size: 35px;
  margin: 0;
  padding: 0;
`;

const NavigationContainer = styled.nav`
  display: inline-block;
  > * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const btnStyle = css`
  border: 2px solid #FFFFFF;
  border-radius: 5px;
  text-transform: lowercase;
  text-decoration: none;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 2px;
  padding: 10px 0;
  width: 150px;
  text-align: center;
  display: inline-block;
  position: relative;
  transition: 0.3s all;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: #FF6077;
    color: #FFFFFF;
    border-color: #FF6077;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const NavLink = styled(Link)`
  ${btnStyle}
`;

const SignOutBtn = styled.button`
  ${btnStyle}
`;
