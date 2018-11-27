import Fuse from 'fuse.js';
// Actions
import {
  ADDOUTGOINGMESSAGE,
  CLOSECONVERSATION,
  GETCONVERSATIONBYID,
  GETSTORAGE,
  UPDATEICOMINGMESSAGES,
  SETFUZZYSEARCHRESULTS
} from '../actions/index';

const conversationReducer = (activeConversation = {}, action) => {
  switch (action.type) {
    case ADDOUTGOINGMESSAGE:
      const newMessages = [...activeConversation.allMessages, action.payload];
      return { ...activeConversation, allMessages: newMessages };

    case CLOSECONVERSATION:
      return {};

    case GETCONVERSATIONBYID:
      return action.payload;

    case UPDATEICOMINGMESSAGES:
      const newIncomingMessages = [...activeConversation.allMessages, action.payload];
      return { ...activeConversation, allMessages: newIncomingMessages };

    case SETFUZZYSEARCHRESULTS:
      var options = {
        keys: [{ name: 'body', weight: 0.9 }]
      };
      var fuse = new Fuse(activeConversation.allMessages, options);
      const fuzzySearchResults = fuse.search(action.payload);
      return { ...activeConversation, fuzzySearchResults };

    case GETSTORAGE:
      return action.payload;

    default:
      return activeConversation;
  }
};

export default conversationReducer;
