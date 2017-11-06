import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '../semantic-theme/semantic.less';

const rootEl = document.getElementById('root');
render(
    <App />,
    rootEl
);