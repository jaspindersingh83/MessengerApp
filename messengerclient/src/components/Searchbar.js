import React from 'react';

const Searchbar = props => {
  return (
    <div>
      <input
        type="text"
        value={props.searchInput}
        onChange={e => props.handleSearchInput(e)}
        style={{
          width: '100%',
          height: '30px',
          paddingLeft: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
          border: 'none'
        }}
        placeholder="Search"
      />
    </div>
  );
};

export default Searchbar;
