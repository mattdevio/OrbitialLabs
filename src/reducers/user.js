/*----------  Initial State  ----------*/
const INITIAL_STATE = {
  username: '',
  email: '',
  token: '',
};

/*----------  Configure Actions  ----------*/
const setAuthorizedUser = (state, { username, email, token }) => {
  console.log(username, email, token);
  if (!username || !email || !token) return state;
  console.log('looks good');
  return {
    ...state,
    username,
    email,
    token,
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