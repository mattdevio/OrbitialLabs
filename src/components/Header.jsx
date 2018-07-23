/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import * as routes from 'constants/routes';

/*=========================================
=            Header Component            =
=========================================*/

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: this.getRoutes(props.location.pathname),
    };
    props.history.listen(this.onRouteChange.bind(this));
    this.handleBrandClick = this.handleBrandClick.bind(this);
  }

  handleBrandClick() {
    const { history } = this.props;
    history.push(routes.LANDING);
  }

  onRouteChange(location, action) {
    const oldPath = this.props.location.pathname;
    const newPath = location.pathname;
    if (action !== 'PUSH' || oldPath !== newPath) {
      this.setState({
        routes: this.getRoutes(newPath),
      });
    }
  }

  getRoutes(path) {
    const newRoutes = {};
    switch (path) {
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

  render() {
    return (
      <HeaderContainer>
        <BrandContainer onClick={ this.handleBrandClick }>
          <Logo />
          <Name>
            public square
          </Name>
        </BrandContainer>
        <NavigationContainer>
          {Object.keys(this.state.routes).map(key => (
            <NavLink key={ key } to={ key }>
              { this.state.routes[key] }
            </NavLink>
          ))}
        </NavigationContainer>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Header);

/*=====  End of Header Component  ======*/

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 35px 15px;
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

const NavLink = styled(Link)`
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
