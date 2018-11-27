import React from 'react';
import { connect } from 'react-redux';
// actions
import { handleNameSearch } from '../../actions';

const NameSearchBar = props => {
  return (
    <div>
      <input
        type="text"
        onChange={e => props.handleNameSearch(e)}
        style={{
          width: '100%',
          height: '30px',
          paddingLeft: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
          border: 'none'
        }}
        placeholder="Name Search"
      />
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { handleNameSearch }
)(NameSearchBar);
