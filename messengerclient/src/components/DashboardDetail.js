import React from 'react';
import moment from 'moment';

const DashboardDetail = props => {
  const timeLastMessage = moment(
    props.conversation.last_message.created_at
  ).fromNow();
  return (
    <div
      className="Dashboard__Conversation"
      // Pass id and name of conv once dashboard conversation is clicked
      onClick={() => {
        props.loadConversation(
          props.conversation.uuid,
          props.conversation.name
        );
      }}
    >
      <p style={{ width: '40%' }}>{props.conversation.name}</p>
      <p>{props.conversation.unread}</p>
      <p>{timeLastMessage}</p>
    </div>
  );
};

export default DashboardDetail;