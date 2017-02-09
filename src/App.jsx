import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: '', color: '#000000'}, // optional. if currentUser is not defined, it means the user is Anonymous
      chatHistory: [],
      usersOnline: 0
    };
  }

  _onReceiveMessage = (message) => {
    const newMessage = JSON.parse(message.data);

    // parses message to check if it's the message history, number of users online, or user color
    switch (newMessage[0].type) {
      case 'incomingMessage':
        this.setState({chatHistory: newMessage})
        break;

      case 'incomingUsersNumber':
        this.setState({usersOnline: newMessage[0].content});
        break;

      case 'incomingUserColor':
        this.setState({currentUser: {name: this.state.currentUser.name, color: newMessage[0].content}});
        break;

      default:
        throw new Error(`Unknown event type ${newMessage[0].type}`)
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.addEventListener('message', this._onReceiveMessage)
  }

  _postNotification (oldUser, newUser) {
    const nameChange = {
      type: 'postNotification',
      content: `${oldUser} has changed their name to ${newUser}.`,
    }

    this.socket.send(JSON.stringify(nameChange));
  }

  _anonChecker (username) {
    return username === '' ? 'Anonymous' : username;
  }

  _changeUser(newUser) {
    const oldUser = this.state.currentUser.name;

    if (oldUser !== newUser) {
      this.setState({
        currentUser: {name: newUser, color: this.state.currentUser.color}
      })

      this._postNotification(this._anonChecker(oldUser), this._anonChecker(newUser));
    }
  }

  _postMessage(content) {
    const newMessage = {
      type: 'postMessage',
      user: {name: this._anonChecker(this.state.currentUser.name), color: this.state.currentUser.color},
      content: content
    }

    this.socket.send(JSON.stringify(newMessage));
  }


  render() {
    return (
      <div className="app">
        <nav>
          <h1>Chatty</h1>
          <div id="user-count">{this.state.usersOnline} users online</div>
        </nav>
        <MessageList chatHistory={this.state.chatHistory}/>
        <ChatBar currentUser={this.state.currentUser.name} _postMessage={(content) => this._postMessage(content)} _changeUser={(user) => this._changeUser(user)}/>
      </div>
    );
  }
}
export default App;
