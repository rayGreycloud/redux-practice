var redux = require('redux');

console.log('Starting redux todo...');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
//window.devToolsExtension ? window.devToolsExtension() : (f) => {
//   return f;
// }
));

// subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store. getState();

  console.log('Search text: ', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});

//unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'dog'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'cat'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'bird'
});
