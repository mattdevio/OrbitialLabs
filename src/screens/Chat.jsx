/*----------  Vendor Imports  ----------*/
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import {
  NewMessage,
  MessageList,
  withAuthorization,
} from 'components';

/*=========================================
=            Chat Component            =
=========================================*/

const Chat = props => (
  <CenterStack>
    <CurrentUser>
      <UserIcon icon='user-astronaut'></UserIcon>
      <Username>{props.username}</Username>
    </CurrentUser>
    <DescriptionContainer>
      <NewMessage />
      <MessageList />
    </DescriptionContainer>
  </CenterStack>
);

const mapStateToProps = state => ({
  username: state.userState.username,
});

Chat.propTypes = {
  username: PropTypes.string,
};

export default withAuthorization(connect(mapStateToProps, null)(Chat));

/*=====  End of Chat Component  ======*/

const CenterStack = styled.div`
  align-items: center;
  height: calc(100% - 150px);
  margin-top: 150px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
`;

const CurrentUser = styled.article`
  align-items: center;
  display: flex;
  height: 26px;
  justify-content: flex-end;
  max-width: 800px;
  width: 100%;
`;

const Username = styled.div`
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 0 10px;
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 26px;
`;

const DescriptionContainer = styled.article`
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  max-width: 800px;
  width: 100%;
`;
