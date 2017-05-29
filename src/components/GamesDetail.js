import React from 'react';
import * as GameActions from "../actions/GameActions.js";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class GameDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      game: {},
      isEditing: false
    }
  }

  componentWillMount(){
    const _id = this.props.match.params._id;
    const game = this.props.games.find((item) => {
      if(item._id === _id){
        return item
      }
    })
    if(game === undefined){
      console.log("game wasn't found in the store!");
      const game = this.props.actions.findGame(_id)
      .then((data) => {
        this.setState({game: data})
      })
    } else {
      console.log("game was found in the store! Updating state!");
      this.setState({game: game})
    }
  }

  editGame(){
    const formFields = this.refs;
    for(var prop in formFields){
      this.state.game[prop] = formFields[prop].value
    }
    this.setState({game: this.state.game})
    this.props.actions.updateGame(this.state.game)
    .then((data) => {
      console.log('data', data);
    })
    this.toggleEditing()
  }

  toggleEditing(){
    this.setState({isEditing: !this.state.isEditing})
  }

  renderDetails(){
    const styles = {
      marginBottom: "35px"
    }
    if(this.state.isEditing){
      return(
      <div className="ui two column stackable centered page grid ui form">
        <h1 style={styles} className="ui header center aligned"><input type="text" ref="title" name="title" defaultValue={this.state.game.title}/></h1>
        <div className="ui vertical stripe segment field" >
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui blue homehuge header">Description</h3>
                <p>
                  <textarea ref="description" defaultValue={this.state.game.description} name="description"></textarea>
                </p>
                <h3 className="ui blue homehuge header">Rating</h3>
                <p><input type="number" ref="rating" name="rating" defaultValue={this.state.game.rating}/> stars</p>
                <h3 className="ui blue homehuge header">Created At</h3>
                <p>{this.state.game.created_at}</p>
                <button onClick={() => this.toggleEditing()} className="ui primary button">Cancel</button>
                <button onClick={() => this.editGame()} className="ui button">Save</button>
              </div>
              <div className="eight wide right floated column">
                <p>Old Image</p>
                <img className="ui big rounded image" src={this.state.game.image}/><br/>
                <p>New Image</p>
                <input type="text" ref="image" name="image" defaultValue={this.state.game.image}/>
              </div>
            </div>
            </div>
        </div>
      </div>)
    } else {
      return(
      <div className="ui two column stackable centered page grid">
        <h1 style={styles} className="ui header center aligned">{this.state.game.title}</h1>
        <div className="ui vertical stripe segment" >
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h3 className="ui blue homehuge header">Description</h3>
                <p>
                  {this.state.game.description}
                </p>
                <h3 className="ui blue homehuge header">Rating</h3>
                <p>{this.state.game.rating} stars</p>
                <h3 className="ui blue homehuge header">Created At</h3>
                <p>{this.state.game.created_at}</p>
                <button onClick={() => this.toggleEditing()} className="ui primary button">Edit</button>
              </div>
              <div className="eight wide right floated column">
                <img className="ui big rounded image" src={this.state.game.image}/>
              </div>
            </div>
            </div>
        </div>
      </div>)
    }
  }

  render() {
    return (
      <div>
        {this.renderDetails()}
      </div>
    );
  }

}

function mapStateToProps(state){
  return{
    games: state.games
  }
}

function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(GameActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
