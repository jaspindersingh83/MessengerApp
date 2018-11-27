import { combineReducers } from 'redux';
import dashboardReducer from './dashboard';
import conversationReducer from './conversation';

const rootReducer = combineReducers({
  dashboardData: dashboardReducer,
  activeConversation: conversationReducer
});

export default rootReducer;
