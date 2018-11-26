export const ADDMESSAGE = 'ADDMESSAGE';
export const SEARCHINPUT = 'SEARCHINPUT';
export const GETSTORAGE = 'GETSTORAGE';
export const UNDO = 'UNDO';

export const addMessage = (message, conIdx) => {
  const obj = { message, conIdx };
  return {
    type: ADDMESSAGE,
    payload: obj
  };
};

export const handleSearchInput = async e => {
  e.preventDefault();
  return {
    type: SEARCHINPUT,
    payload: e.target.value
  };
};

export const setStorage = conversations => {
  localStorage.setItem('data', JSON.stringify(conversations));
};

export const getStorage = () => {
  const conversations = JSON.parse(localStorage.getItem('data'));
  return {
    type: GETSTORAGE,
    payload: conversations
  };
};
