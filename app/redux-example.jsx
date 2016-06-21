var redux = require('redux');

console.log('Starting redux example...');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store. getState();

  console.log('New state ', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>'
  }
});

//unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

//test dispatch actions
store.dispatch(actions.changeName('Gomer'));

store.dispatch(actions.addHobby('Fishing'));
store.dispatch(actions.addHobby('Sitting'));
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Goober'));

store.dispatch(actions.addMovie('No Time for Sergeants', 'Comedy'));
store.dispatch(actions.addMovie('Deliverance', 'Action'));
store.dispatch(actions.removeMovie(2));
