/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import Storage from 'bin/LocalStorage';


/**
 * withAuthentication - HOC that loads & verifies a jwt from local storage
 * @param  {ReactNode} Component [The component to wrap]
 * @return {ReactNode}           [The component with the load & verify functionality]
 */
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        ready: false,
      };
    }

    async componentDidMount() {
      const s = Storage.getInstance();
      const token = s.getToken();
      if (token) {
        await axios.get('/api/user/validate', {
          headers: {
            authorization: token,
          },
        })
          .then(({ data }) => {
            if (data.success) {
              this.props.setAuthorizedUser(data.username, data.email, token);
            } else {
              s.setToken(null);
            }
          })
          .catch((error) => {
            console.dir(error);
            s.setToken(null);
          });
      }
      this.setState({
        ready: true,
      });
    }

    render() {
      return this.state.ready ? <Component /> : null;
    }

  } // end class WithAuthentication

  const mapDispatchToProps = dispatch => ({
    setAuthorizedUser: (username, email, token) => dispatch({
      type: 'SET_AUTHORIZED_USER',
      username: username,
      email: email,
      token: token,
    }),
  });

  WithAuthentication.propTypes = {
    setAuthorizedUser: PropTypes.func.isRequired,
  };

  return connect(null, mapDispatchToProps)(WithAuthentication);

};

export default withAuthentication;
