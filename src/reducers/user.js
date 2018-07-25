/*----------  Initial State  ----------*/
const INITIAL_STATE = {
  username: '',
  email: '',
  token: '',
};

/*----------  Configure Actions  ----------*/
const setAuthorizedUser = (state, { username, email, token }) => {
  if (!username || !email || !token) return state;
  return {
    ...state,
    username,
    email,
    token,
  };
};

const logoutUser = (state, action) => {
  return {
    ...INITIAL_STATE,
  };
};

/*====================================
=            User Reducer            =
====================================*/

function userReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_AUTHORIZED_USER':
      return setAuthorizedUser(state, action);
    case 'LOGOUT_USER':
      return logoutUser(state, action);
    default: 
      return state;
  }

}

export default userReducer;

/*=====  End of User Reducer  ======*/
