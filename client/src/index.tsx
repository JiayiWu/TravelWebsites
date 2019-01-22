import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import reducers from './reducers/index'
import createStore from './store'
import * as serviceWorker from './serviceWorker';

let store = createStore(reducers);

(window as any).logStore = () => {
  console.log(fromJS(store.getState()).toJS())
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
