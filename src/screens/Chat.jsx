/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
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


class Chat extends Component {

  constructor(props) {
    super(props);
    this.socket = io({

    });
  }

  render() {
    return (
      <CenterStack>
        <DescriptionContainer>
          <NewMessage />
          <MessageList />
        </DescriptionContainer>
      </CenterStack>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userState.token,
});

Chat.propTypes = {
  token: PropTypes.string.isRequired,
};

export default withAuthorization(connect(mapStateToProps)(Chat));

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
