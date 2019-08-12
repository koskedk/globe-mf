import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {App} from "./containers/App";
import 'primereact/resources/primereact.css';
import './assets/theme/theme-maun.scss'
import './assets/layout/css/layout-maun.scss'
import 'primeicons/primeicons.css';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
serviceWorker.unregister();
