import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store, Middleware, Dispatch, AnyAction} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { BrowserRouter as Router } from "react-router-dom";

const composeEnhancers = composeWithDevTools({})

export const store = createStore(rootReducer, 
  composeEnhancers(
    applyMiddleware(
      loadingBarMiddleware(),
      thunk as Middleware<{}, unknown, Dispatch<AnyAction>>
    )
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);


