import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  render() {
    return (
      <div className="app">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
