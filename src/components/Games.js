import React from 'react';
import {Link} from "react-router-dom";
import * as GameActions from "../actions/GameActions.js";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class Games extends React.Component {
  deleteGame(_id){
    console.log('_id', _id);
    this.props.actions.deleteGame(_id)
    .then((data) => {
      this.props.actions.deleteGameFromStore(_id)
    })
  }


  renderGames(){
    const styles = {
      marginLeft: "25px"
    }
    if(this.props.games.length !== 0){
      let gamesList = []
      this.props.games.map((game) => {
        gamesList.push(
          <div key={game.title} className="three wide column">
                <div className="ui card">
                  <div className="image">
                    <img src={game.image}/>
                  </div>
                  <div className="content">
                    <Link to={"game/" + game._id}>
                      <h3 className="header">{game.title}</h3>
                    </Link>
                    <div className="meta">
                      <span className="date">Created at {game.created_at}</span>
                    </div>
                    <div className="description">
                      {game.description}
                    </div>
                  </div>
                  <div className="extra content">
                    <strong>Rating:</strong>
                    <i className="star icon"></i>
                       {game.rating}
                    <button onClick={() => this.deleteGame(game._id)} style={styles} className="ui red button">Delete</button>
                  </div>
                </div>
          </div>
        )
      })
      return gamesList
    } else {
      <p>No games found :( </p>
    }
  }

  render() {
    return (
      <div className="ui grid centered">
        {this.renderGames()}
      </div>
    );
  }

}


function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(GameActions, dispatch)}
}

export default connect(null, mapDispatchToProps)(Games);
