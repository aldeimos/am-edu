import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import {createStore} from "redux";
import rootReducer from "./store";
import {Provider} from "react-redux";

const store = createStore(rootReducer);

connect.send('VKWebAppInit', {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));
