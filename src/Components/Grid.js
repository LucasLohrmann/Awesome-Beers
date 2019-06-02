import React from 'react';
import axios from 'axios';
import '../Css/Grid.css';

import GridItem from './GridItem'

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
   }

   componentDidMount(){
    axios.get(`https://api.punkapi.com/v2/beers`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
    }

    render() {
        return (
            this.state.data.map((item, i) => {
                return(
                    <GridItem key={i} item={item} />
                )
            })
        )
    }
}