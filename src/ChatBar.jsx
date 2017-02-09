import React, {Component} from 'react';


class ChatBar extends Component {
  handleKeyPress(e) {
    if(e.key === 'Enter'){
      this.props._postMessage(e.target.value);
      e.target.value = '';
    }
  }

  render() {
      console.log('Rendering <ChatBar/>');
    return (
      <div className="wrapper">
        <footer>
          <input id="username" type="text" placeholder="Your Name (Optional)"
                                           defaultValue={this.props.currentUser}
                                           onBlur ={(e) => this.props._changeUser(e.target.value)} />
          <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress.bind(this)}/>
        </footer>
      </div>
    );
  }
}
export default ChatBar;