import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions';
import moment from 'moment';
import Message from './Message';
import './Common.css';

const Conversation = props => {
  const conIdx = props.conIdx;
  return (
    <div className="Board__Column">
      <p style={{width:'40%'}}>
        <h4>{props.name}</h4>
      </p>
      <p>{props.unread}</p>
      <p>{moment(props.timeLastMessage).fromNow()}</p>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addMessage }
)(Conversation);
