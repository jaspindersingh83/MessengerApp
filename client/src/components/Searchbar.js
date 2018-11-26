import React from 'react';
import { connect } from 'react-redux';
import {handleSearchInput} from '../actions'
import './Common.css';

const Searchbar = props => {
  return (
    <div className="Board__Searchbar">
      <form className="Searchbar__input" onSubmit={this.onSearchSubmit}>
        <input
          type="text"
          value={props.searchInput}
          onChange={e => props.handleSearchInput(e)}
          //Arrow up/down/enter are implemented on this component
          // style={{
          //   width: '100px',
          //   height: '30px'
          // }}
          placeholder="Search"
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput
  };
};

export default connect(
  mapStateToProps,
  { handleSearchInput }
)(Searchbar);
