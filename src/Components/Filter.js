import React from 'react';
import '../Css/Filter.css';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterList: [],
            from: "",
            to: ""
        }

        this.setFromCriteria = this.setFromCriteria.bind(this);
        this.setToCriteria = this.setToCriteria.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
   }

    componentWillReceiveProps(nextProps){
        this.setState({
            filterList: nextProps.filterList,
            from: nextProps.from ? nextProps.from : "",
            to: nextProps.to ? nextProps.to : ""
        });
    }

    setFromCriteria(e){
        this.setState({
            from: e.target.value
        });
    }

    setToCriteria(e){
        this.setState({
            to: e.target.value
        });
    }

    applyFilter(){
        this.props.applyFilter(this.state.from, this.state.to);
    }

    render() {
         return (
            <div className="filterContainer">
                <div className="filterRow row">
                    <div className="filterColumn col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label className="filterHeaderLabel">
                            First Brewed:
                        </label>
                    </div>
                    <div className="filterColumn col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>Between</label>
                        <select value={this.state.from} onChange={(e) => this.setFromCriteria(e)}>
                            {
                                this.state.filterList.map((item, i) => {
                                return(
                                    <option value={item} key={i}>{item}</option>
                                );  
                                })
                            }
                        </select>
                    </div>
                    <div className="filterColumn col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>And</label>
                        <select  value={this.state.to} onChange={(e) => this.setToCriteria(e)}>
                            {
                                this.state.filterList.map((item, i) => {
                                return(
                                        <option value={item} key={i}>{item}</option>
                                );  
                                })
                            }
                        </select>
                    </div>
                    <div className="filterColumn col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <button className="filterButton" onClick={() => this.applyFilter()}>
                            GO!
                        </button>
                    </div>
                </div>
            </div>
         );
    }
}