import React from 'react';
import '../Css/Filter.css';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterList: [],
            from: null,
            to: null
        }

        this.setFromCriteria = this.setFromCriteria.bind(this);
        this.setToCriteria = this.setToCriteria.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
   }

    componentWillReceiveProps(nextProps){
        this.setState({
            filterList: nextProps.filterList,
            from: nextProps.from,
            to: nextProps.to
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
            <div>
                <div>
                    <label>
                        First Brewed
                    </label>
                </div>
                <div>
                    <label>Between</label>
                    <select value="" onChange={(e) => this.setFromCriteria(e)}>
                        {
                            this.state.filterList.map((item, i) => {
                              return(
                                  <option value={item} key={i}>{item}</option>
                              );  
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>And</label>
                    <select  value="" onChange={(e) => this.setToCriteria(e)}>
                        {
                            this.state.filterList.map((item, i) => {
                              return(
                                    <option value={item} key={i}>{item}</option>
                              );  
                            })
                        }
                    </select>
                </div>
                <button onClick={() => this.applyFilter()}>
                    GO!
                </button>
            </div>
         );
    }
}