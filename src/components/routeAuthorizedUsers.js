/*----------  Vendor Imports  ----------*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import { CHAT } from 'constants/routes';

/**
 * routeAuthorizedUsers - HOC that routes authorized users hitting unprotected routes to a protected page
 * @param  {ReactNode} Component [The component to wrap]
 * @return {ReactNode}           [The component that re-routes users]
 */
const routeAuthorizedUsers = (Component) => {
  class RouteAuthorizedUsers extends React.Component {


    componentDidMount() {
      const { history, username } = this.props;
      if (username) history.push(CHAT);
    }

    render() {
      return <Component />;
    }

  } // end class RouteAuthorizedUsers

  const mapStateToProps = ({ userState }) => ({
    username: userState.username,
  });

  RouteAuthorizedUsers.propTypes = {
    history: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
  };

  return withRouter(connect(mapStateToProps)(RouteAuthorizedUsers));

};

export default routeAuthorizedUsers;
