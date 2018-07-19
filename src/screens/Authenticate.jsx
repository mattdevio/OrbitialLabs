/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import history from '../services/history';
import Header from '../components/Header';

/*=========================================
=        Authentication Component         =
=========================================*/

class Authenticate extends Component {

  constructor(props) {

    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    history.replace('/chat');
  }

  render() {
    return (
      <LandingMainContainer>
        <Header />
        <BackgroundGradient />
        <CenterStack>
          <DescriptionContainer>
            <DescriptionHeader />
            <AuthForm onSubmit={this.handleSubmit}>
              <AuthLabel>
                email
                <AuthInput type='text' value={this.state.email} onChange={this.handleEmail} />
              </AuthLabel>
              <AuthLabel>
                password
                <AuthInput type='text' value={this.state.password} onChange={this.handlePassword} />
              </AuthLabel>
              <AuthInputSubmit type='submit' value='SIGN IN' />
            </AuthForm>
          </DescriptionContainer>
        </CenterStack>
      </LandingMainContainer>
    );
  }
}

export default Authenticate;

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
  justify-content: center;
  position: relative;
`;

const DescriptionContainer = styled.article`
  align-self: flex-end;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-around;
  width: 400px;
`;

const DescriptionHeader = styled.h3.attrs({
  children: 'Welcome back.',
})`
  color: #585858;
  font-weight: 300;
  letterSpacing: 1px;
  text-align: center;
`;

const AuthForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 235px;
`;

const AuthLabel = styled.label`
  color: #585858;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  padding: 10px;
  width: 80%;
`;

const AuthInput = styled.input`
  width: 200px;
`;

const AuthInputSubmit = styled.input`
  background: #FF6077;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  letter-spacing: 1px;
  margin-top: 50px;
  width: 200px;
`;
