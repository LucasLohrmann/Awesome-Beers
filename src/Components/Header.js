import React from 'react';
import '../Css/Header.css'; 

export default class Header extends React.Component {
    constructor(props) {
        super(props);
   }
    render() {
         return (
            <div className="header">
                AWESOME BEERS!
            </div>
         );
    }
}