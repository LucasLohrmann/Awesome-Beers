import React from 'react';
import '../Css/GridItem.css';

export default class GridItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        }
   }

   componentWillReceiveProps(nextProps){
        this.setState({
            item: nextProps.item 
        })
   }

    render() {
         return (
            <div>{this.state.item.name}</div>
         );
    }
}