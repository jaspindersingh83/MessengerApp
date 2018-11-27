import React from 'react';
import { connect } from 'react-redux';
// actions
import { handleFuzzySearch } from '../../actions';

const FuzzySearchBar = props => {
  return (
    <div>
      <input
        type="text"
        onChange={e => props.handleFuzzySearch(e)}
        style={{
          width: '100%',
          height: '30px',
          paddingLeft: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
          border: 'none'
        }}
        placeholder="Fuzzy Search"
      />
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { handleFuzzySearch }
)(FuzzySearchBar);
