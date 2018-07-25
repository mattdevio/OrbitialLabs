/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/

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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const mutation = {};
    mutation[event.target.id] = event.target.value;
    this.setState(mutation);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
    } = this.state;
    return (
      <CenterStack>
        <DescriptionContainer>
          <DescriptionHeader />
          <AuthForm onSubmit={ this.handleSubmit }>
            <AuthLabel htmlFor='email'>
              email
              <AuthInput
                id='email'
                type='text'
                value={ email }
                onChange={ this.handleChange }
              />
            </AuthLabel>
            <AuthLabel htmlFor='password'>
              password
              <AuthInput
                id='password'
                type='text'
                value={ password }
                onChange={ this.handleChange }
              />
            </AuthLabel>
            <AuthInputSubmit>
              SIGN IN
            </AuthInputSubmit>
          </AuthForm>
        </DescriptionContainer>
      </CenterStack>
    );
  }
}

export default Authenticate;

/*=====  End of Landing Component  ======*/

const CenterStack = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  margin-top: 150px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DescriptionContainer = styled.article`
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
  margin: 0;
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
  align-items: center;
`;

const AuthInput = styled.input`
  width: 200px;
  padding: 5px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

const AuthInputSubmit = styled.button.attrs({
  input: 'submit',
})`
  background: #FF6077;
  text-align: center;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  letter-spacing: 1px;
  margin-top: 50px;
  width: 200px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
