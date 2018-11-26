import React, { Component } from 'react';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Glyphicon } from 'react-bootstrap';

export default class Texteditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleReturn = async e => {
    e.preventDefault();
    const htmlContent = stateToHTML(this.state.editorState.getCurrentContent());
    await this.props.handleMessageSubmit(htmlContent);
    const editorState = EditorState.push(
      this.state.editorState,
      ContentState.createFromText('')
    );
    await this.setState({
      editorState
    });
  };
  makeBold = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  makeItalic = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    );
  };

  makeUnderline = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    );
  };

  render() {
    return (
      <div>
        <Glyphicon
          glyph="bold"
          onClick={() => {
            this.makeBold();
          }}
        />
        <Glyphicon
          glyph="italic"
          onClick={() => {
            this.makeItalic();
          }}
        />
        <Glyphicon
          glyph="magnet"
          onClick={() => {
            this.makeUnderline();
          }}
        />
        <Editor
          onChange={editorState => {
            this.onChange(editorState);
          }}
          handleReturn={this.handleReturn}
          editorState={this.state.editorState}
          placeholder="Type a message..."
        />
      </div>
    );
  }
}
