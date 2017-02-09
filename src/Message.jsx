import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log('Rendering <Message/>');
    return (
      <div className="wrapper">
        <div className="message">
          <span className="username" style={{color: this.props.userColor}}>{this.props.userName}</span>
          <span className="content">{this.props.content}</span>
        </div>
      </div>
    );
  }
}
export default Message;
