import React, { Component } from 'react';
import {Link, Route} from "react-router-dom"
import GamesDetail from './components/GamesDetail.js'
import GamesList from "./components/GamesList.js"
import CreateGame from "./components/CreateGame.js"

class App extends Component {
  render() {
    var styles = {
      paddingTop: "50px"
    }
    return (
      <div  className="ui container centered">
        <div className="ui three item menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/games">Games</Link>
          <Link className="item" to="/games/new/">New Game</Link>
      </div>
      <div style={styles}>
        <Route exact path="/games" component={GamesList}/>
        <Route exact path="/games/new/" component={CreateGame}/>
        <Route exact path="/game/:_id" component={GamesDetail}/>
      </div>
    </div>
    );
  }
}

export default App;
