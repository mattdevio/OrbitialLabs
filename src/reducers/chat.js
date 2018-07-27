/*----------  Subsection comment block  ----------*/
import cloneDeep from 'lodash.clonedeep';

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

const addMessage = (state, { username, message, id }) => {
  if (!username || !message || !id) return state;
  const newMessage = { username, message, id };
  const newState = cloneDeep(state);
  newState.messages.push(newMessage);
  return newState;
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
    case 'ADD_MESSAGE':
      return addMessage(state, action);
    default:
      return state;
  }

}

export default chatReducer;

/*=====  End of Section comment block  ======*/
