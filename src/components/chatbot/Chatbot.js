import React from "react"; //retirei {Component}
import axios from "axios";
import Message from "./Message";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import Card from "./Card";
import QuickReplies from "./QuickReplies";
import './Chatbot.css';
import { Navbar, Nav } from "react-bootstrap";

const cookies = new Cookies();

class Chatbot extends React.Component {
  messagesEnd;
  talkInput;
  constructor(props) {
    super(props);

    // binding com callback
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.handleQuickReplyPayload = this.handleQuickReplyPayload.bind(this);

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.state = {
      messages: [],
      showBot: false, //visibilidade por default
    };

    if (cookies.get("cookiesId") === undefined) {
      cookies.set("cookiesId", uuid(), { path: "/" });
    }
    console.log(cookies.get("cookiesId"));
  }

  async text_query(queryText) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: queryText,
        },
      },
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("api/text-query", {
      text: queryText,
      cookiesId: cookies.get("cookiesId"),
    });
    for (let msg of res.data.fulfillmentMessages) {
      //console.log(JSON.stringify(msg)); //ver estrutra da msg do dialogflow
      says = {
        speaks: "Toby",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async event_query(eventName) {
    const res = await axios.post("/api/event-query", {
      event: eventName,
      cookiesId: cookies.get("cookiesId"),
    });
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "me",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  componentDidMount() {
    this.event_query("Welcome");
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  // fechar e abrir bot

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: false });
  }

  //quickreplies setup
  handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    switch (payload) {
      case "training_skateclass":
        this.event_query("SKATECLASS");
      default:
        this.text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.cards
    ) {
      return (
        <div key={i}>
          <div className="card-panel- grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a
                  href="/"
                  className="btn-floating btn-large waves-effect waves-light green"
                >
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      270,
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this.handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(returnedMessages) {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div 
          style={{
            height: 400,
            width: 950,
            position: "absolute",
            bottom: 0,
            right: 200,
            border: "5px solid lightdark",
          }}
        >
          <Navbar bg="dark" variant="dark">
             
              <Nav.Link href="/" onClick={this.hide}>
                    ❌
                  </Nav.Link>
            
          </Navbar>

          <div
            id="chatbot"
            style={{ height: 388, width: "100%", overflow: "auto" }}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            ></div>
          </div>
          <div className="col s12">
            <input
              style={{
                margin: 0,
                paddingLeft: "1%",
                paddingRight: "1%",
                width: "98%",
              }}
              placeholder="type a message"
              type="text"
              ref={(input) => {
                this.talkInput = input;
              }}
              onKeyPress={this.handleInputKeyPress}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: 400,
            width: 400,
            position: "relative", //change from absolute
            bottom: 0,
            right: 0,
            border: "5px solid lightdark",
          }}
        >
          <Navbar bg="dark" variant="dark">
            
            <Nav.Link href="/" onClick={this.show}>
                  CLICK FLIP TO OPEN ✌
                </Nav.Link>
          
        </Navbar>
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      );
    }
  }
}

export default Chatbot;
