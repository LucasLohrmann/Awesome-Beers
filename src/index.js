import React from 'react';
import ReactDOM from 'react-dom';
import './Css/Index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import Main from './Components/Main';

class App extends React.Component {
    render() {
         return (
               <Main />
         );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
serviceWorker.unregister();
