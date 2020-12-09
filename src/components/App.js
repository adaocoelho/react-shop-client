import React, {useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Shop from "./shop/Shop";
import Header from "./Header";
import Chatbot from "./chatbot/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/*const App = () => {
    return (
        <div>Hello</div>
    )
};*/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Chatbot />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
