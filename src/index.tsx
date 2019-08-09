import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {App} from "./containers/App";
import './assets/theme/theme-dark-blue.scss'
import './assets/layout/css/layout-dark-blue.scss'
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
serviceWorker.unregister();
