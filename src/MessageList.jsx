import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList/>');
    return (
      <div id="message-list">
        {
          this.props.chatHistory.map((result) => {
            console.log(result.type);
            switch (result.type) {
              case 'incomingMessage':
                return (
                  <Message userName={result.username} content={result.content} key={result.id}/>
                )
                break;
              case 'incomingNotification':
                return (
                  <div className="message system" key={result.id}>{result.content}</div>
                )
                break;
            }
          })
        }
      </div>
    );
  }
}
export default MessageList;