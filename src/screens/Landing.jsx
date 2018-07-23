/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

/*----------  Custom Imports  ----------*/
import ThreeIconGroup from '../components/ThreeIconGroup';


/*=========================================
=            Landing Component            =
=========================================*/

class Landing extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    console.log(event.target);
  }

  render() {
    return (
      <CenterStack>
        <CTAContainer>
          <CallButton onClick={this.handleRegister} />
        </CTAContainer>
        <DescriptionContainer>
          <DescriptionHeader />
          <ThreeIconGroup />
        </DescriptionContainer>
      </CenterStack>
    );
  }
}

export default withRouter(Landing);

/*=====  End of Landing Component  ======*/

const CenterStack = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const CTAContainer = styled.div`
  align-items: flex-end;
  height: 325px;
  display: flex;
`;

const CallButton = styled.button.attrs({
  children: 'GET STARTED TODAY',
})`
  background: #FF6077;
  border: 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  height: 75px;
  letter-spacing: 1px;
  width: 300px;
`;

const DescriptionContainer = styled.article`
  align-self: flex-end;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 350px;
  justify-content: space-evenly;
  width: 670px;
`;

const DescriptionHeader = styled.h3.attrs({
  children: 'A minimalist group messenger.',
})`
  color: #585858;
  font-weight: 300;
  letterSpacing: 1px;
  text-align: center;
`;
