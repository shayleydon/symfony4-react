import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App title={window.App.title} />, document.getElementById('app'));