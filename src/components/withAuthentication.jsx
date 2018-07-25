/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/*----------  Custom Imports  ----------*/
import Storage from 'bin/LocalStorage';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {

    componentDidMount() {
      const s = Storage.getInstance();
      const token = s.getToken();
      if (token) {
        axios.get('/api/user/validate', {
          headers: {
            authorization: token,
          },
        })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    }

    render() {
      return (
        <Component />
      );
    }

  }

  const mapDispatchToProps = dispatch => ({
    setAuthorizedUser: (username, email, token) => dispatch({
      type: 'SET_AUTHORIZED_USER',
      username: username,
      email: email,
      token: token,
    }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);

};

export default withAuthentication;
