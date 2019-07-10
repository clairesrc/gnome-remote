import React from 'react';
import axios from 'axios';
const ENTER_KEY = 13;
export default class Notification extends React.Component {
    state = {
        notificationText: 'text here'
    }

  sendNotification = async () => {
    return await axios.post(`http://${window.location.hostname}:4000/notification`, {
        text: this.state.notificationText
    });
  };

  handleNotificationKeyDown = (event: React.KeyboardEvent) => {
    const input$: any = event.nativeEvent.srcElement;
    const value = input$ ? input$.value.trim() : '';
    this.setState({notificationText: value});

    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    if (input$ && this.state.notificationText) {
      this.sendNotification();
      if (input$) input$.value = '';
    }
  };

  render() {
    return (
      <section className="App-notification">
        <input ref="notificationText" type="text" onKeyDown={ e => this.handleNotificationKeyDown(e) } />
        <button onClick={this.sendNotification}>Send</button>
      </section>
    );
  }
}
