/*----------  Initial State  ----------*/
const INITIAL_STATE = {
  messages: [],
  connected: false,
};

/*----------  Configure Actions  ----------*/
const setInitialMessages = (state, { messages }) => {
  return {
    ...state,
    messages: messages,
  };
};

const setConnectionState = (state, { connected }) => {
  return {
    ...state,
    connected: connected,
  };
};


/*=============================================
=            Section comment block            =
=============================================*/

function chatReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_INITIAL_MESSAGES':
      return setInitialMessages(state, action);
    case 'SET_CONNECTION_STATE':
      return setConnectionState(state, action);
    default:
      return state;
  }

}

export default chatReducer;

/*=====  End of Section comment block  ======*/
