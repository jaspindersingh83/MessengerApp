import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
// actions
import { getConversationById } from '../../actions';

const DashboardItemDetail = props => {
  const { uuid, name, unread, last_message } = props.conversation;
  const { created_at } = last_message;
  const timeLastMessage = moment(created_at).fromNow();
  return (
    <div
      className="dashboard__conversation"
      onClick={e => {
        props.getConversationById(uuid, name);
      }}
    >
      <p style={{ width: '30%' }}>{name}</p>
      <p>{unread}</p>
      <p>{created_at}</p>
      <p>{timeLastMessage}</p>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getConversationById }
)(DashboardItemDetail);
