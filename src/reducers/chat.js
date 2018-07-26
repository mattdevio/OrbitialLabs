/*----------  Initial State  ----------*/
const INITIAL_STATE = {
  messages: [],
};

/*----------  Configure Actions  ----------*/
const setInitialMessages = (state, { messages }) => {
  return {
    ...state,
    messages: messages,
  };
};


/*=============================================
=            Section comment block            =
=============================================*/

function chatReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_INITIAL_MESSAGES':
      return setInitialMessages(state, action);
    default:
      return state;
  }

}

export default chatReducer;

/*=====  End of Section comment block  ======*/
