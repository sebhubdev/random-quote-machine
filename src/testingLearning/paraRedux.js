// Eto es un reducer para Redux
const reducer = (state = 5) => {
    return state;
  }

// This is the way to create a Redux store

const store=Redux.createStore(reducer);

// Para buscar un estado en redux se usa getState()

const currentState=store.getState();

// redux work with action and the action is an object that will specifies the type of the action 
// while de data is optional

const action={type:'LOGIN'};

// for  send the action to redux is needed an action creator
// an action creator is simply a javascript function that returns an action
// In other words, action creator create objects that represent action events

const actionCreator=(action)=>action;

// to dispath action to the redux store use the dispath function with an action creatos as parameter

store.dispatch(actionCreator())

// The reducer are used to handle de action, A reducer takes state and action as arguments, 
// and it always returns a new state
// the reducer function must always return a new copy of state and never modify state directly.

const defaultState = {
    login: false
  };
  
  const reducer = (state = defaultState, action) => {
    // Change code below this line
      if(action.type=='LOGIN')
      {
        state={login: true}
      }
      return state;
    // Change code above this line
  };
  
  const store = Redux.createStore(reducer);
  
  const loginAction = () => {
    return {
      type: 'LOGIN'
    }
  };


//   Use a Switch Statement to Handle Multiple Actions

const defaultState = {
    authenticated: false
  };
  
  const authReducer = (state = defaultState, action) => {
    // Change code below this line
  switch(action.type)
  {
    case 'LOGIN' :
    state={authenticated: true}
    return state;  
    case 'LOGOUT' :
    state={authenticated: false}
    return state;
    default :
    return state;
  }
    // Change code above this line
  };
  
  const store = Redux.createStore(authReducer);
  
  const loginUser = () => {
    return {
      type: 'LOGIN'
    }
  };
  
  const logoutUser = () => {
    return {
      type: 'LOGOUT'
    }
  };

//   Las acciones por seguridad es mejor registrarlas como constantes

const LOGIN='LOGIN';

// Register a Store Listener

// Another method you have access to on the Redux store object is store.subscribe(). 
// This allows you to subscribe listener functions to the store, which are called whenever 
// an action is dispatched against the store. One simple use for this method is to subscribe 
// a function to your store that simply logs a message every time an action is received 
// and the store is updated.

const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// Global count variable:
let count = 0;

store.subscribe(()=>{
  count++
});

// Change code below this line

// Change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);

// Combine Multiple Reducers
// When the state of your app begins to grow more complex, 
// it may be tempting to divide state into multiple pieces.

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  count:counterReducer,
  auth:authReducer 
})

const store = Redux.createStore(rootReducer);

// Send Action Data to the Store

const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // Change code below this line
  case ADD_NOTE :
        state=action.text
    // Change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // Change code below this line
    return {
      type:ADD_NOTE,
      text:note
    }
  // Change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());

// Use Middleware to Handle Asynchronous Actions Redux.applyMiddleware()

const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    // Dispatch request action here

    store.dispatch(requestingData())

    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      // Dispatch received data action here
  store.dispatch(receivedData(data))
    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);



