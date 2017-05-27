import React, { Component } from 'react';
import {connect} from "react-redux"
import Games from "./Games"
import * as GameActions from "../actions/GameActions"

class GamesList extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div>
        <h1 className="ui header center aligned">Games List</h1>
        <Games games={this.props.games} />
      </div>
    );
  }
}

GamesList.propTypes = {
  games: React.PropTypes.array.isRequired
}

function mapStateToProps(state){
  return{
    games: state.games
  }
}

export default connect(mapStateToProps, GameActions)(GamesList);
