import React from 'react';
import { connect } from 'react-redux';
import './Common.css';

const Message = props => {
  const body = props.message.body;
  const direction = props.message.direction;
  return (
    <div className="Board__Column_Message">
      {direction !== 0 ? <p>{body}</p> : <p>{body}</p>}
    </div>
  );
};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(Message);
