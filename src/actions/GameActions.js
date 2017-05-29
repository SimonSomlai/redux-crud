import * as types from "../constants/ActionTypes.js"

// API CALLS
export const findGame = function(_id){
  return(dispatch) => {
    console.log('getting game with _id' + _id + ' through api call');
    return fetch("http://redux-crud-rest.herokuapp.com/games" + _id)
    .then((response) => {
      return response.json()
    })
  }
}

export const fetchGames = function(){
  return (dispatch) => {
    console.log('getting all games through api call');
    fetch("http://redux-crud-rest.herokuapp.com/games")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      dispatch(setGames(data))
    })
  }
}

export const createGame = function(game){
  return (dispatch) => {
    const created_at = new Date()
    game.created_at = created_at
    console.log('creating game through api call');
    return fetch("http://redux-crud-rest.herokuapp.com/games",{
        method: "post",
        body: JSON.stringify(game),
        dataType: 'json',
        headers: {
          "Content-Type": 'application/json'
        }
    })
    .then(function(response){
      return response.json();
    })
  }
}

export const updateGame = function(newGame){
  return (dispatch) => {
    console.log('updating game through api call');
    return fetch("http://redux-crud-rest.herokuapp.com/games/" + newGame._id,
      {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( newGame )
    })
    .then(function(response){
      return response.json();
    })
  }
}

export const deleteGame = function(_id) {
  return (dispatch) => {
    console.log('deleting game through api call');
    return fetch("http://redux-crud-rest.herokuapp.com/games/" + _id,
      {method: 'delete'})
    .then((response) => {
      return response.json()}
    )
  }
}


// STATE ALTERING ACTIONS
export const setGames = function(games){
  return{
    type: types.SET_GAMES,
    games: games
  }
}

export const addGame = function(game){
  return{
    type: types.ADD_GAME,
    game: game
  }
}

export const deleteGameFromStore = function(_id){
  return{
    type: types.DELETE_GAME,
    _id: _id
  }
}
