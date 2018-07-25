/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import swal from 'sweetalert';
import axios from 'axios';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import Storage from 'bin/LocalStorage';
import { CHAT } from 'constants/routes';
import { routeAuthorizedUsers } from 'components';

/*=========================================
=        Authentication Component         =
=========================================*/

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameIsBad: false,
      emailIsBad: false,
      passwordIsBad: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const mutation = {};
    mutation[event.target.id] = event.target.value;
    mutation[`${event.target.id}IsBad`] = false;
    this.setState(mutation);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateFormFields(({ username, email, password }) => {
      axios.post('/api/user/signup', { username, email, password })
        .then(({ data }) => {
          if (data.success) {
            Storage.getInstance().setToken(data.token);
            this.props.setAuthorizedUser(username, email, data.token);
            this.props.history.push(CHAT);
          } else {
            swal(data.error);
          }
        })
        .catch((error) => {
          console.log(error);
          swal({
            icon: 'error',
            title: 'Oops!',
            text: 'Something bad happened, please try again.',
            button: true,
          });
        });

    });
  }

  validateFormFields(callback) {
    const s = { ...this.state };
    s.username = s.username.trim();
    s.email = s.email.trim();
    s.password = s.password.trim();
    if (!s.username) s.usernameIsBad = true;
    if (!s.email) s.emailIsBad = true;
    if (!s.password) s.passwordIsBad = true;
    this.setState(s);
    if (!s.usernameIsBad && !s.emailIsBad && !s.passwordIsBad) callback(s);
  }

  render() {
    const {
      username,
      email,
      password,
      usernameIsBad,
      emailIsBad,
      passwordIsBad,
    } = this.state;
    return (
      <CenterStack>
        <DescriptionContainer>
          <DescriptionHeader />
          <AuthForm onSubmit={this.handleSubmit}>
            <AuthLabel htmlFor='username'>
              username
              <AuthInput
                id='username'
                type='text'
                value={ username }
                onChange={ this.handleChange }
                isBad={ usernameIsBad }
              />
            </AuthLabel>
            <AuthLabel htmlFor='email'>
              email
              <AuthInput
                id='email'
                type='text'
                value={ email }
                onChange={ this.handleChange }
                isBad={ emailIsBad }
              />
            </AuthLabel>
            <AuthLabel htmlFor='password'>
              password
              <AuthInput
                id='password'
                type='password'
                value={ password }
                onChange={ this.handleChange }
                isBad={ passwordIsBad }
              />
            </AuthLabel>
            { (usernameIsBad || emailIsBad || passwordIsBad) && <ErrorMessage /> }
            <AuthInputSubmit>
              REGISTER
            </AuthInputSubmit>
          </AuthForm>
        </DescriptionContainer>
      </CenterStack>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAuthorizedUser: (username, email, token) => dispatch({
    type: 'SET_AUTHORIZED_USER',
    username,
    email,
    token,
  }),
});

Register.propTypes = {
  setAuthorizedUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default routeAuthorizedUsers(withRouter(connect(null, mapDispatchToProps)(Register)));

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
  justify-content: center;
  width: 400px;
`;

const DescriptionHeader = styled.h3.attrs({
  children: 'Great choice.',
})`
  color: #585858;
  font-weight: 300;
  letterSpacing: 1px;
  text-align: center;
  margin: 15px 0;
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
  border-color: ${({isBad}) => isBad ? '#F00' : 'inherit'};
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.span.attrs({
  children: 'All fields are required',
})`
  color: #F00;
  padding: 5px 0;
  display: block;
  widthL 100%;
  text-align: center;
`;

const AuthInputSubmit = styled.button.attrs({
  type: 'submit',
})`
  background: #FF6077;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  letter-spacing: 1px;
  width: 200px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
