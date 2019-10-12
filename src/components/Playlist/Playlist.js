import React, { Component } from 'react';
import './playlist.css';

class Playlist extends Component{
    render(){
        return(
            <div className='color'>
                 <img />
                <h3>{this.props.playlist.name}</h3>
                <ul>
                    {this.props.playlist.songs.map(song => 
                        <li key={Math.random()}>{song.name}</li>    
                    )}
                </ul>
            </div>
        );
    }
}

export default Playlist;