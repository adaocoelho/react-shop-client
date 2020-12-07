import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import { queryAllByAltText } from '@testing-library/react';


class Chatbot extends React.Component {

    constructor(props) {
        super(props)
        
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
        this.state= {
            messages: []
        }
    }


   async text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }

        };

        this.setState({messages: [...this.state.messages, says]});
const res = await axios.post('api/text-query', {text});
for (let msg of res.data.fulfillmentMessages) {
    says = {
        speaks: 'Toby',
        msg: msg
    }
    this.setState({messages: [...this.state.messages, says]});
}

    }
    
    async event_query(event) {
        const res = await axios.post('/api/event-query', {event});
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'me',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }
    
    componentDidMount() {
        this.event_query('Welcome');
    }



renderMessages(stateMessages) {
    if (stateMessages) {
        return stateMessages.map((message, i) => {
                   return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
        });
    } else {
        return null;
    }
}


handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        this.text_query(e.target.value);
        e.target.value = '';
    }
}



    render () {
        return (
            <div style={{height: 400, width: 400, float: 'right'}}>
                <div id='chatbot' style={{height: '100%', width: '100%', overflow: 'auto' }} >
                 <h2>Toby</h2>
                 {this.renderMessages(this.state.messages)}
                 <input type="text" onKeyPress={this.handleInputKeyPress} />

                </div>

            </div>
        )
    }

}






export default Chatbot;