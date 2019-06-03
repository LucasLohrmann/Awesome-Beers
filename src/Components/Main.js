import React from 'react';
import '../Css/Main.css';
import Grid from './Grid';
import Header from './Header';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
   }

    render() {
         return (
             <div className='mainContainer'>
                <Header />
                <Grid />
            </div>
         );
    }
}