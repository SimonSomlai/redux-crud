import * as types from "../constants/ActionTypes.js"

export default function games(state = [], action = {}){
  console.log('action', action, "state", state)
  switch (action.type) {
    case types.SET_GAMES:
    return action.games;

    case types.ADD_GAME:
    const addedState = state.push(action.game)
    return addedState

    case types.DELETE_GAME:
    const game = state.find((game, index) => {
      if (game._id === action._id){
        return game
      }
    })
    const index = state.indexOf(game)
    var deletedState = state.slice();
    deletedState.splice(index,1);
    return deletedState

    default: return state;
  }
}
