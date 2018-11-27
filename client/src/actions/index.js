import axios from 'axios';
import Socket from 'socket.io-client';

// Dashboard Actions
export const GETALLCONVERSATIONS = 'GETALLCONVERSATIONS';
export const SETNAMESEARCHRESULTS = 'SETNAMESEARCHRESULTS';

// Conversation Actions
export const ADDOUTGOINGMESSAGE = 'ADDOUTGOINGMESSAGE';
export const CLOSECONVERSATION = 'CLOSECONVERSATION';
export const GETCONVERSATIONBYID = 'GETCONVERSATIONBYID';
export const GETSTORAGE = 'GETSTORAGE';
export const UPDATEICOMINGMESSAGES = 'UPDATEICOMINGMESSAGES';
export const SETFUZZYSEARCHRESULTS = 'SETFUZZYSEARCHRESULTS';

// Dashboard Action Functions

export const getAllConversations = async () => {
  const apiUrl = 'https://sec.meetkaruna.com/api/v1/conversations';
  let allConversations;
  try {
    const getConversations = await axios.get(apiUrl);
    const numOfPages = Math.floor(
      getConversations.data.total / getConversations.data.per_page
    );
    allConversations = getConversations.data.data;
    for (let i = 1; i <= numOfPages; i++) {
      const newConversations = await axios.get(`${apiUrl}?page=${i}`);
      allConversations = [...allConversations, ...newConversations.data.data];
    }
  } catch (error) {
    console.log(error);
  }
  return {
    type: GETALLCONVERSATIONS,
    payload: allConversations
  };
};
export const getStorage = () => {
  const conversationActive = JSON.parse(localStorage.getItem('data'));
  return {
    type: GETSTORAGE,
    payload: conversationActive
  };
};

export const handleNameSearch = e => {
  e.preventDefault();
  const searchInput = e.target.value;
  const reGex = new RegExp(searchInput, 'i');
  return {
    type: SETNAMESEARCHRESULTS,
    payload: reGex
  };
};
export const setStorage = async activeConversation => {
  localStorage.setItem('data', JSON.stringify(activeConversation));
};

// Conversation Action Functions
export const addOutgoingMessage = message => {
  const messageObj = { body: message, direction: 'outgoing' };
  if (message !== '<p><br></p>') {
    return {
      type: ADDOUTGOINGMESSAGE,
      payload: messageObj
    };
  }
};
export const closeConversation = () => {
  return {
    type: CLOSECONVERSATION
  };
};

export const getConversationById = async (id, name) => {
  const apiUrl = `https://sec.meetkaruna.com/api/v1/conversations/${id}`;
  let allMessages;
  try {
    const getConversationById = await axios.get(apiUrl);
    const numOfPages = Math.floor(
      getConversationById.data.total / getConversationById.data.per_page
    );
    allMessages = getConversationById.data.data.messages;
    for (let i = 1; i <= numOfPages; i++) {
      const newMessages = await axios.get(`${apiUrl}?page=${i}`);
      allMessages = [...allMessages, ...newMessages.data.data.messages];
    }
  } catch (error) {
    console.log(error);
  }
  const obj = { id, name, allMessages };
  return {
    type: GETCONVERSATIONBYID,
    payload: obj
  };
};

export const handleFuzzySearch = e => {
  e.preventDefault();
  const searchInput = e.target.value;
  return {
    type: SETFUZZYSEARCHRESULTS,
    payload: searchInput
  };
};

// Websocket for rendering incoming messages in real time
export const initializeSocket = (id) => {
  const apiUrl = `https://sec.meetkaruna.com/api/v1/conversations/${id}`;
  // Initialize Socket
  this.socket = Socket(apiUrl);
  // Receives Response after the update
  this.socket.on('updateIncomingMessages', response => {
    return {
      type: UPDATEICOMINGMESSAGES,
      payload: response.data.messages
    };
  });
  // Error Handling
  this.socket.on('error', data => {
    this.props.history.push('/');
  });
};
