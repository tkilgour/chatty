import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList/>');
    return (
      <div id="message-list">
        {
          this.props.chatHistory.map((result) => {
            switch (result.type) {
              case 'incomingMessage':
                return (
                  <Message userName={result.user.name} img={result.img} content={result.content} userColor={result.user.color} key={result.id}/>
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