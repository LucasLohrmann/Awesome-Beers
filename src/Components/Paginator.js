import React from 'react';
import '../Css/Paginator.css';

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageCount: 0,
            pageNumbers: [],
            itemTotalCount: 0,
            itemsPerPage: 0,
            firstItemIndex: 0,
            lastItemIndex: 0
        }

        this.handlePageSelection = this.handlePageSelection.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
   }

   componentWillReceiveProps(nextProps){
       debugger;
       let pageCount = Math.ceil(nextProps.itemTotalCount / nextProps.itemsPerPage);
       let pageNumbers = [];
       for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
       }

        this.setState({
            itemsPerPage: nextProps.itemsPerPage,
            itemTotalCount: nextProps.itemTotalCount,
            pageCount: pageCount,
            pageNumbers: pageNumbers
        });
   }

   setCurrentPage(pageNumber){
       debugger;
       this.setState({
           currentPage: pageNumber
       }, () => this.handlePageSelection());
   }

   handlePageSelection(){
       debugger;
    let lastItemIndex = (this.state.currentPage * this.state.itemsPerPage);
    let firstItemIndex = (lastItemIndex - this.state.itemsPerPage);

        this.props.displayPage(this.state.currentPage, firstItemIndex, lastItemIndex);
   }

    render() {
         return (
            <div>
                {
                    this.state.pageNumbers.map((number, i) => {
                        return(
                            <button id={number} key={i} onClick={(e) => this.setCurrentPage(e.target.id)}>{number}</button>
                        );
                    })
                }
            </div>
         );
    }
}