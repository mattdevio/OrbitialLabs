/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import { AUTH } from 'constants/routes';



/**
 * withAuthorization - HOC that renders components for authorized users only.
 * @param  {ReactNode} Component [The react component to protect]
 * @return {ReactNode}           [The protected react node]
 */
const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      const { username, history } = this.props;
      if (!username) history.push(AUTH);
    }

    render() {
      return this.props.username ? <Component /> : null;
    }

  } // end class WithAuthorization

  const mapStateToProps = ({ userState }) => {
    return {
      username: userState.username,
    };
  };

  WithAuthorization.propTypes = {
    username: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  return withRouter(connect(mapStateToProps)(WithAuthorization));

};

export default withAuthorization;
