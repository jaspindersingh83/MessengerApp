import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStorage, setStorage } from '../actions';
import Searchbar from './Searchbar';
import Conversation from './Conversation';
import './Common.css';

class Board extends Component {
  // componentDidMount() {
  //   if (localStorage.hasOwnProperty('data')) {
  //     this.props.getStorage();
  //   }
  //   window.addEventListener('beforeunload', () => {
  //     this.props.setStorage(this.props.conversations);
  //   });
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('beforeunload', () => {
  //     this.props.setStorage(this.props.conversations);
  //   });  
  // }
  render() {
    let conversations;
    this.props.searchInput !== undefined
      ? (conversations = this.props.searchResults)
      : (conversations = this.props.conversations);
    return (
      <div>
        <div className="Board">
          <Searchbar />
          {conversations.map((conversation, conIdx) => {
            const messagesArr = conversation.messages;
            const lastMessageIndex = messagesArr.length - 1;
            const timeLastMessage = messagesArr[lastMessageIndex].created_at;
            return (
              <Conversation
                key={conIdx}
                conIdx={conIdx}
                name={conversation.name}
                timeLastMessage={timeLastMessage}
                unread={conversation.unread}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conversations: state.data.conversations,
    searchResults: state.searchResults,
    searchInput: state.searchInput
  };
};

export default connect(
  mapStateToProps,
  { getStorage, setStorage }
)(Board);
