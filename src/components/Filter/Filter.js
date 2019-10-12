import React, { Component } from 'react';
import './filter.css';

class Filter extends Component{
    render(){
        return(
            <div className='filter'>
                <img />
                <input 
                    type="text" 
                    onKeyUp={event => 
                        this.props.onTextChange(event.target.value)}
                />
                Filter
            </div>
        );
    }
}

export default Filter;