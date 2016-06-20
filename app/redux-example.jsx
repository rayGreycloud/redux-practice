var redux = require('redux');

console.log('Starting redux example...');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default:
      return state;
  };
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  };
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
//window.devToolsExtension ? window.devToolsExtension() : (f) => {
//   return f;
// }
));

// subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store. getState();

  document.getElementById('app').innerHTML = state.name;

  console.log('New state ', store.getState());
});

//unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

//test actions
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Bubba'
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Gomer'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Fishing'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Sitting'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'No Time for Sergeants',
  genre: 'Comedy'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Deliverance',
  genre: 'Action'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});
