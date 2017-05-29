import React from 'react';
import * as GameActions from "../actions/GameActions.js";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import { bindActionCreators } from 'redux';
import classnames from "classnames";
import _ from "lodash";

class CreateGame extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      game: {
        title: "",
        description: "",
        image: ""
      },
      errors: {
        title: "",
        description: "",
        image: ""
      },
      loading: false
    }
  }

  updateState(e){
    this.state.game[e.target.name] = e.target.value
    this.state.errors[e.target.name] = ""
    this.setState({game: this.state.game, errors: this.state.errors})
  }

  submitForm(e){
    e.preventDefault()
    let errors = {};
    if(this.state.game.title === ""){errors.title = "Can't be empty"}
    if(this.state.game.description === ""){errors.description = "Can't be empty"}
    if(this.state.game.image === ""){errors.image = "Can't be empty"}
    this.setState({errors: errors})
    if(_.isEmpty(errors)){
      this.setState({game: {}, errors: {}, loading: true})
      this.props.actions.createGame(this.state.game)
      .then((data) => {
        this.setState({loading: false});
        window.location = "http://ec2-34-210-55-49.us-west-2.compute.amazonaws.com/games/"
      })
    }
  }

  renderImage(){
    if (this.state.game.image !== "") {
      return(
        <div className="field">
          <label>Current Image</label>
          <img className="ui medium bordered image" src={this.state.game.image}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="ui two column stackable centered page grid">
      <h1 className="ui header center aligned">Create New Game</h1>
        <div className="column ten wide">
          <form onSubmit={(e) => this.submitForm(e)} className={classnames('ui', 'form', {loading: this.state.loading})}>
            {this.renderImage()}
            <div className={classnames('field', {error: !!this.state.errors.image})}>
              <label>New Image</label>
              <input
                type="text"
                placeholder="image url"
                defaultValue={this.state.game.image}
                name="image"
                onChange={(e) => this.updateState(e)}/>
                <span>{this.state.errors.image}</span>
            </div>
            <div className={classnames('field', {error: !!this.state.errors.title})}>
              <label>Game Title</label>
              <input
                type="text"
                placeholder="game title"
                defaultValue={this.state.game.title}
                name="title"
                onChange={(e) => this.updateState(e)}/>
                <span>{this.state.errors.title}</span>
            </div>
            <div className={classnames('field', {error: !!this.state.errors.description})}>
              <label>Game Description</label>
              <textarea
                type="text"
                placeholder="game description"
                defaultValue={this.state.game.description}
                name="description"
                onChange={(e) => this.updateState(e)}>
              </textarea>
              <span>{this.state.errors.description}</span>
            </div>
            <div className={classnames('field', {error: !!this.state.errors.rating})}>
              <label>Game Rating</label>
              <input
                type="number"
                defaultValue={this.state.game.rating}
                name="rating"
                onChange={(e) => this.updateState(e)}
              />
              <span>{this.state.errors.description}</span>
            </div>
            <div className="field">
              <button onClick={(e) => this.submitForm(e)} type="submit" className="ui primary button" name="submit">Create Game</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(GameActions, dispatch)}
}

export default connect(null, mapDispatchToProps)(CreateGame);
