/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


/*================================================
=            ThreeIconGroup Component            =
================================================*/

const ThreeIconGroup = () => (
  <ThreeIconContainer>
    <SplashIcon
      icon='check-circle'
      label='simple'
    />
    <SplashIcon
      icon='lock'
      label='secure'
    />
    <SplashIcon
      icon='signal'
      label='scalable'
    />
  </ThreeIconContainer>
);

export default ThreeIconGroup;

/*=====  End of ThreeIconGroup Component  ======*/

const ThreeIconContainer = styled.div`
  display: flex;
  height: 200px;
  justify-content: space-around;
`;


/*============================================
=            SplashIcon Component            =
============================================*/

const SplashIcon = ({ icon, label }) => (
  <SplashIconContainer>
    <SplashGradient>
      <StyledFontAwesomeIcon
        icon={ icon }
      />
    </SplashGradient>
    <IconDescription>
      { label }
    </IconDescription>
  </SplashIconContainer>
);

SplashIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

/*=====  End of SplashIcon Component  ======*/

const SplashIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const SplashGradient = styled.div`
  align-items: center;
  background: linear-gradient(90deg, rgba(255,85,108,1) 0%, rgba(226,120,255,1) 100%);
  border-radius: 5px;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 80px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 45px;
`;

const IconDescription = styled.div`
  color: #353535;
  text-align: center;
`;
