import React, { Component } from 'react';
// Modules
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Socket from 'socket.io-client';
// Components
import Texteditor from './Richtexteditor';
import Searchbar from './Searchbar';
// Css
import './Common.css';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      searchInput: '',
      outGoingMessage: '',
      allMessages: [],
      searchResults: []
    };
    this.initializeSocket(props.id);
  }
  // Needed Async only for scrollTo Bottom because scrollToBottom
  // was getting invoked even before all the messages are HTTPed
  async componentDidMount() {
    //Fetch all the messages of a conversation data using api GET /conversations/<uuid>
    await this.getConversationById(this.state.id);
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
  async componentWillReceiveProps(nextProps) {
    await this.setState({
      id: nextProps.id,
      name: nextProps.name
    });
    await this.getConversationById(this.state.id);
    this.scrollToBottom();
  }
  getConversationById = async id => {
    const apiUrl = `https://sec.meetkaruna.com/api/v1/conversations/${id}`;
    const getConversationById = await axios.get(apiUrl);
    const numOfPages = Math.floor(
      getConversationById.data.total / getConversationById.data.per_page
    );
    let allMessages = getConversationById.data.data.messages;
    for (let i = 1; i <= numOfPages; i++) {
      const newMessages = await axios.get(`${apiUrl}?page=${i}`);
      allMessages = [...allMessages, ...newMessages.data.data.messages];
    }
    this.setState({
      allMessages
    });
  };

  handleMessageSubmit = async message => {
    const outGoingMessage = message;
    const allMessages = [
      ...this.state.allMessages,
      { body: outGoingMessage, direction: 'outgoing' }
    ];
    if (outGoingMessage.length) {
      await this.setState({
        outGoingMessage,
        allMessages
      });
      this.scrollToBottom();
    }
  };

  handleSearchInput = e => {
    e.preventDefault();
    const searchInput = e.target.value;
    // Implementing Fuzzy Search by searchInput by creating a regex
    const reGex = new RegExp(searchInput, 'i');
    const searchResults = this.state.allMessages.filter(item => {
      if (item.body.search(reGex) !== -1) {
        return item;
      } else {
        return null;
      }
    });
    this.setState({
      searchInput,
      searchResults
    });
  };

  // Websocket for rendering incoming messages in real time
  initializeSocket = id => {
    const apiUrl = `https://sec.meetkaruna.com/api/v1/conversations/${id}`;
    // Initialize Socket
    this.socket = Socket(apiUrl);
    // Receives Response after the update
    this.socket.on('updateIncomingMessages', response => {
      this.getConversationById();
    });
    // Error Handling
    this.socket.on('error', data => {
      this.props.history.push('/');
    });
  };
  render() {
    let messages;
    // Check if there is a searchInput if yes then display the search results
    //  otherwise display all results
    this.state.searchInput.length
      ? (messages = this.state.searchResults)
      : (messages = this.state.allMessages);
    return (
      <div className="Conversation">
        <div className="Coversation__Namebar">
          <b>{this.state.name}</b>
          <b
            style={{ cursor: 'pointer' }}
            onClick={this.props.closeConversation}
          >
            x
          </b>
        </div>
        <Searchbar
          handleSearchInput={this.handleSearchInput}
          searchInput={this.state.searchInput}
        />
        <div className="Conversation__Container">
          {messages.map(message => (
            <ConversationDetail key={message.uuid} message={message} />
          ))}
          {/* This is dummy div to bring scrollbar to bottom */}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <Texteditor handleMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
}

function ConversationDetail({ message }) {
  return (
    <div>
      {message.direction === 'outgoing' ? (
        <div className="Conversation__Outgoing">
          {ReactHtmlParser(message.body)}
        </div>
      ) : (
        <div className="Conversation__Incoming">{message.body}</div>
      )}
    </div>
  );
}

export default Conversation;
