import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
// @TODO

const firebaseConfig = {
  apiKey: 'AIzaSyDvtMJp_5boOTukaKTrZRtIM4rT3TAcNIQ',
  authDomain: 'reactclientpanel-823bd.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-823bd.firebaseio.com',
  projectId: 'reactclientpanel-823bd',
  storageBucket: 'reactclientpanel-823bd.appspot.com',
  messagingSenderId: '872549555533'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true // Firestore for profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making s tore creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebse instance as first argument
  reduxFirestore(firebase) // needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
