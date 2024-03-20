import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/* React Redux, redux, redux-thunk setup */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // Import thunk middleware
import rootReducers from './Reducers';

import App from './App';

// Create the Redux store with middleware (thunk in this case)
const store = createStore(rootReducers, compose(applyMiddleware(thunk)));

// Create a React root
const root = ReactDOM.createRoot(document.getElementById('root'));


// Render the App component wrapped with Redux Provider
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
