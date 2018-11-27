import moment from 'moment';

// Actions
import { GETALLCONVERSATIONS, SETNAMESEARCHRESULTS } from '../actions/index';

const dashboardReducer = (dashboardData = {}, action) => {
  switch (action.type) {
    case GETALLCONVERSATIONS:
      const allConversations = action.payload;
      allConversations.sort((conv1, conv2) => {
        const a = moment(conv1.last_message.created_at).unix();
        const b = moment(conv2.last_message.created_at).unix();
        if (a > b) return -1;
        if (b > a) return 1;
        return 0;
      });
      return { ...dashboardData, allConversations };

    case SETNAMESEARCHRESULTS:
      const regEx = action.payload;
      const conversations = dashboardData.allConversations;
      const nameSearchResults = conversations.filter(item => {
        if (item.name.search(regEx) !== -1) {
          return item;
        } else {
          return null;
        }
      });
      return { ...dashboardData, nameSearchResults };

    default:
      return dashboardData;
  }
};

export default dashboardReducer;
