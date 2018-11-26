import React, { Component } from 'react';
// Modules
import axios from 'axios';
import moment from 'moment';
// Components
import Conversation from './Conversation';
import DashboardDetail from './DashboardDetail';
import Searchbar from './Searchbar';
// Css
import './Common.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      allConversations: [],
      searchResults: [],
      conversationActive: {}
    };
  }
  componentDidMount() {
    //Fetch all the conversations data using api GET /conversations
    this.getConversations();
    if (localStorage.hasOwnProperty('data')) {
      this.getStorage();
    }
    window.addEventListener('beforeunload', () => {
      this.setStorage(this.state.conversationActive);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', () => {
      this.setStorage(this.state.conversationActive);
    });
  }

  setStorage = async columns => {
    await localStorage.setItem('data', JSON.stringify(columns));
  };

  getStorage = async () => {
    const conversationActive = await JSON.parse(localStorage.getItem('data'));
    this.setState({
      conversationActive
    });
  };

  getConversations = async () => {
    const apiUrl = 'https://sec.meetkaruna.com/api/v1/conversations';
    const getConversations = await axios.get(apiUrl);
    const numOfPages = Math.floor(
      getConversations.data.total / getConversations.data.per_page
    );
    let allConversations = getConversations.data.data;
    for (let i = 1; i <= numOfPages; i++) {
      const newConversations = await axios.get(`${apiUrl}?page=${i}`);
      allConversations = [...allConversations, ...newConversations.data.data];
    }
    allConversations.sort((conv1, conv2) => {
      // convert to unix timestamp using moment js and then sort
      const a = moment(conv1.last_message.created_at).unix();
      const b = moment(conv2.last_message.created_at).unix();
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    });
    this.setState({
      allConversations
    });
  };

  handleSearchInput = e => {
    e.preventDefault();
    const searchInput = e.target.value;
    // Implementing Fuzzy Search by name
    const reGex = new RegExp(searchInput, 'i');
    const searchResults = this.state.allConversations.filter(item => {
      if (item.name.search(reGex) !== -1) {
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
  //Sets the active conversation id when the conversation item is clicked
  loadConversation = (id, name) => {
    this.setState({
      conversationActive: { id, name }
    });
  };
  closeConversation = e => {
    this.setState({
      conversationActive: {}
    });
  };
  render() {
    let conversations;
    // Check if there is a searchInput, if yes ,then display the search results
    //  otherwise display all results
    this.state.searchInput.length
      ? (conversations = this.state.searchResults)
      : (conversations = this.state.allConversations);
    return (
      <div className="Home">
        <div className="Dashboard">
          <Searchbar
            handleSearchInput={this.handleSearchInput}
            searchInput={this.state.searchInput}
          />
          <div className="Dashboard__Container">
            {conversations.map(conversation => (
              <DashboardDetail
                key={conversation.uuid}
                loadConversation={this.loadConversation}
                conversation={conversation}
              />
            ))}
          </div>
        </div>
        {/* If there is an active conversation mount the conversation component */}
        {this.state.conversationActive.id ? (
          <Conversation
            id={this.state.conversationActive.id}
            name={this.state.conversationActive.name}
            closeConversation={this.closeConversation}
          />
        ) : null}
      </div>
    );
  }
}

export default Dashboard;
