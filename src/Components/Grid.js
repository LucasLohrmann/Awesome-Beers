import React from 'react';
import axios from 'axios';
import '../Css/Grid.css';

import GridItem from './GridItem'
import Paginator from './Paginator'

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            paginatedData: []
        }

        this.displayPage = this.displayPage.bind(this);
   }

   componentDidMount(){
    axios.get(`https://api.punkapi.com/v2/beers`)
      .then(res => {
          debugger;
        const data = res.data;
        this.setState({ data }, () => this.displayPage(1, 0, 4));
      })
    }

    displayPage(pageNumber, firstItemIndex, lastItemIndex){
        debugger;
        let paginatedData = this.state.data.slice(firstItemIndex, lastItemIndex);

        this.setState({
            paginatedData: paginatedData
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.paginatedData.map((item, i) => {
                        return(
                            <GridItem key={i} item={item} />
                        )
                    })
                }
                <Paginator itemsPerPage={4} itemTotalCount={this.state.data.length} displayPage={(pageNumber, firstItemIndex, lastItemIndex) => this.displayPage(pageNumber, firstItemIndex, lastItemIndex)}/>
            </div>
        )
    }
}