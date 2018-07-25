/*----------  Initial State  ----------*/
const INITIAL_STATE = {
  username: '',
  email: '',
  token: '',
};

/*----------  Configure Actions  ----------*/
const setAuthorizedUser = (state, { username, email, password }) => {
  if (!username || !email || !password) return state;
  return {
    ...state,
    username,
    email,
    password,
  };
};

/*====================================
=            User Reducer            =
====================================*/

function userReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_AUTHORIZED_USER':
      return setAuthorizedUser(state, action);
    default: 
      return state;
  }

}

export default userReducer;

/*=====  End of User Reducer  ======*/
