import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {App} from "./containers/App";
import './assets/theme/theme-maun.scss'
import './assets/layout/css/layout-maun.scss'
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
serviceWorker.unregister();
