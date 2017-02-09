import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log('Rendering <Message/>');

    const checkImg = (img) => {
      if (img != '') {
        return <img src={this.props.img}/>
      }
    }

    return (
      <div className="wrapper">
        <div className="message">
          <span className="username" style={{color: this.props.userColor}}>{this.props.userName}</span>
          <span className="content">{this.props.content}{checkImg(this.props.img)}</span>
          </div>
      </div>
    );
  }
}
export default Message;
