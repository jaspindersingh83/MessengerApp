import { ADDMESSAGE, GETSTORAGE, SEARCHINPUT } from '../actions';
import { fromJS } from 'immutable';

const initialState = {
  data: {
    conversations: [
      {
        name: 'Winnie',
        unread: 0,
        messages: [
          {
            body: 'Walk the dog',
            direction: 1,
            created_at: '2018-11-20T22:55:28.660Z'
          },
          {
            body: 'Learn React',
            direction: 0,
            created_at: '2018-11-23T07:33:28.660Z'
          }
        ]
      },
      {
        name: 'Bob',
        unread: 1,
        messages: [
          {
            body: 'Walk the dog',
            direction: 1,
            created_at: '2018-11-20T20:33:28.660Z'
          },
          {
            body: 'Learn React',
            direction: 0,
            created_at: '2018-11-20T21:33:28.660Z'
          }
        ]
      },
      {
        name: 'Thomas',
        unread: 0,
        messages: [
          {
            body: 'Walk the dog',
            direction: 1,
            created_at: '2018-11-20T18:33:28.660Z'
          },
          {
            body: 'Learn React',
            direction: 0,
            created_at: '2018-11-20T19:33:28.660Z'
          }
        ]
      },
      {
        name: 'George',
        unread: 2,
        messages: [
          {
            body: 'Walk the dog',
            direction: 0,
            created_at: '2018-11-20T19:33:28.660Z'
          },
          {
            body: 'Learn React',
            direction: 1,
            created_at: '2018-11-20T22:33:28.660Z'
          }
        ]
      }
    ]
  }
};

export default (data = initialState, action) => {
  switch (action.type) {
    // case ADDMESSAGE:
    //   const message = action.payload.message;
    //   const conIdx = action.payload.conIdx;
    //   const newCols = [...conversations;
    //   const actionCol = newCols[conIdx];
    //   actionCol.messages = [...actionCol.messages, message];
    //   return newCols;

    case SEARCHINPUT:
      const searchInput = action.payload;
      const reGex = new RegExp(searchInput, 'i');
      const searchResults = data.data.conversations.filter(item => {
        if (item.name.search(reGex) !== -1) {
          return item;
        } else {
          return null;
        }
      });
      const collection = fromJS(data);
      let newCollection = collection.setIn(['searchInput'], searchInput);
      newCollection = newCollection.setIn(['searchResults'], searchResults);
      return newCollection.toJS();

    case GETSTORAGE:
      return [...action.payload];

    default:
      return data;
  }
};
