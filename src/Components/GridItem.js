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
            <div className="gridItemContainer col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div className="textContainer">
                    <div className="itemName">
                        {this.state.item.name}
                    </div>
                    <div className="itemTag">
                        {this.state.item.tagline}
                    </div>
                    <div className="itemDescription" title={this.state.item.description}>
                        {this.state.item.description}
                    </div>
                </div>
                <div className="imageContainer">
                        <img src={this.state.item.image_url}/>
                </div>
            </div>
         );
    }
}