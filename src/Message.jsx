import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message/>');
    return (
      <div className="wrapper">
        <div className="message">
          <span className="username">{this.props.userName}</span>
          <span className="content">{this.props.content}</span>
        </div>
        {/*<div className="message system">
                  Anonymous1 changed their name to nomnom.
                </div>*/}
      </div>
    );
  }
}
export default Message;
