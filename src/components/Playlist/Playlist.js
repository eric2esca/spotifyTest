import React, { Component } from 'react';
import './playlist.css';

class Playlist extends Component{
    render(){
        return(
            <div className='color'>
                 <img />
                <h3>Playlist Name</h3>
                <ul>
                    <li>Song1</li>
                    <li>Song2</li>
                    <li>Song3</li>
                </ul>
            </div>
        );
    }
}

export default Playlist;