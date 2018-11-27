import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
// actions
import { closeConversation, initializeSocket } from '../../actions';

// Components
import FuzzySearchBar from './FuzzySearchBar';
import Texteditor from './RichtextEditor';

class Conversation extends Component {
  componentDidMount() {
    this.scrollToBottom();
    //this.props.initializeSocket(this.props.id);
  }
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
  render() {
    let messagesToRender;
    const { allMessages, fuzzySearchResults, name } = this.props;
    fuzzySearchResults && fuzzySearchResults
      ? (messagesToRender = fuzzySearchResults)
      : (messagesToRender = allMessages);
    return (
      <div className="conversation">
        <div className="coversation__namebar">
          <b>{name}</b>
          <b
            style={{ cursor: 'pointer' }}
            onClick={this.props.closeConversation}
          >
            x
          </b>
        </div>
        <FuzzySearchBar />
        <div className="conversation__container">
          {messagesToRender.map(message => (
            <ConversationDetail key={message.uuid} message={message} />
          ))}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <Texteditor />
      </div>
    );
  }
}

function ConversationDetail({ message }) {
  return (
    <div>
      {message.direction === 'outgoing' ? (
        <div className="conversation__outgoing">
          {ReactHtmlParser(message.body)}
        </div>
      ) : (
        <div className="conversation__incoming">{message.body}</div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  const {
    allMessages,
    fuzzySearchResults,
    id,
    name
  } = state.activeConversation;
  return {
    allMessages,
    fuzzySearchResults,
    id,
    name
  };
};

export default connect(
  mapStateToProps,
  { closeConversation, initializeSocket }
)(Conversation);
