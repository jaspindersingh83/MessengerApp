import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { getAllConversations, getStorage, setStorage } from '../../actions';
// components
import Conversation from '../Conversation/Conversation.js';
import DashboardItemDetail from './DashboardItemDetail';
import NameSearchBar from './NameSearchBar';
// css
import '../common.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllConversations();
    if (localStorage.hasOwnProperty('data')) {
      this.props.getStorage();
    }
    window.addEventListener('beforeunload', () => {
      this.props.setStorage(this.props.activeConversation);
    });
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', () => {
      this.props.setStorage(this.props.activeConversation);
    });
  }
  render() {
    let conversations;
    this.props.nameSearchResults
      ? (conversations = this.props.nameSearchResults)
      : (conversations = this.props.allConversations);
    return (
      <div className="home">
        <div className="dashboard">
          <NameSearchBar />
          <div className="dashboard__container">
            {conversations
              ? conversations.map(conversation => (
                  <DashboardItemDetail
                    key={conversation.uuid}
                    conversation={conversation}
                  />
                ))
              : null}
          </div>
        </div>
        {this.props.activeConversation.id ? <Conversation /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { allConversations, nameSearchResults } = state.dashboardData;
  const { activeConversation } = state;
  return {
    activeConversation,
    allConversations,
    nameSearchResults
  };
};

export default connect(
  mapStateToProps,
  { getAllConversations, getStorage, setStorage }
)(Dashboard);
