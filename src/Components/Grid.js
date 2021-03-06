import React from 'react';
import axios from 'axios';
import '../Css/Grid.css';

import GridItem from './GridItem';
import Paginator from './Paginator';
import Filter from './Filter';

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            paginatedData: [],
            filterCriteriaList: [],
            filterTo: null,
            filterFrom: null,
            pageNumber: 1
        }

        this.displayPage = this.displayPage.bind(this);
        this.filterData = this.filterData.bind(this);
        this.setDefaultFilters = this.setDefaultFilters.bind(this);
        this.formatCriteriaList = this.formatCriteriaList.bind(this);
        this.formatDateCriteria = this.formatDateCriteria.bind(this);
   }

   componentDidMount(){
    axios.get(`https://api.punkapi.com/v2/beers`)
      .then(res => {
            const data = res.data;
            this.setState({ data }, () => {
                this.setDefaultFilters();
                setTimeout(() => {
                    this.displayPage(1, 0, 4);
                }, 500);
            });
      })
    }

    setDefaultFilters(){
        let criteriaList = [];
        this.state.data.forEach((item, i) => {
            let criteria = item.first_brewed.split("/");
            // let date = new Date();

            // date.setMonth(criteria[0]);
            // date.setFullYear(criteria[1])

            let date = this.formatDateCriteria(criteria);

            criteriaList.push(date);
        });
        criteriaList.sort(function(a,b){
            return a - b
        });

        let formattedFilterCriteriaList = this.formatCriteriaList(criteriaList);

        this.setState({
            filterCriteriaList: formattedFilterCriteriaList,
            filterFrom: formattedFilterCriteriaList[0],
            filterTo: formattedFilterCriteriaList[criteriaList.length - 1]
        }, () => this.filterData(this.state.filterFrom, this.state.filterTo));
    }

    formatCriteriaList(criteriaList){
        let formattedList = [];
        criteriaList.forEach((date) => {
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let stringDate = month.toString() + "/" + year.toString();
            formattedList.push(stringDate)
        });
        return formattedList;
    }

    filterData(from, to){
        let formattedFrom = this.formatDateCriteria(from.split("/"));
        let formattedTo = this.formatDateCriteria(to.split("/"));

        let filteredData = this.state.data.filter((item) => {
            let criteria = item.first_brewed.split("/");
            let date = this.formatDateCriteria(criteria);

            return date >= formattedFrom && date <= formattedTo;
        });

        this.setState({
            filterFrom: from,
            filterTo: to,
            filteredData: filteredData,
            pageNumber: 1
        }, () => {
            let lastItemIndex = (this.state.pageNumber * 4);
            let firstItemIndex = (lastItemIndex - 4);

            this.displayPage(this.state.pageNumber, firstItemIndex, lastItemIndex)
        });
    }

    formatDateCriteria(criteria){
        let date = new Date();

        date.setMonth(criteria[0]);
        date.setFullYear(criteria[1])

        return date;
    }

    displayPage(pageNumber, firstItemIndex, lastItemIndex){
        let paginatedData = this.state.filteredData.slice(firstItemIndex, lastItemIndex);

        this.setState({
            paginatedData: paginatedData,
            pageNumber: pageNumber
        });
    }

    render() {
        return (
            <div className="gridContainer">
                <Filter from={this.state.filterFrom} to={this.state.filterTo} filterList={this.state.filterCriteriaList} applyFilter={(from, to) => this.filterData(from, to)}/>
                <div className="gridRow row">
                    {
                        this.state.paginatedData.map((item, i) => {
                            return(
                                <GridItem key={i} item={item} />
                            )
                        })
                    }
                </div>
                <Paginator itemsPerPage={4} itemTotalCount={this.state.filteredData.length} displayPage={(pageNumber, firstItemIndex, lastItemIndex) => this.displayPage(pageNumber, firstItemIndex, lastItemIndex)}/>
            </div>
        )
    }
}