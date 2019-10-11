import React, { Component } from 'react';
import './playlistCounter.css';

class PlaylistCounter extends Component{
    render(){
        return(
            <div className='counter'>
                <h2>{this.props.playlists.length} playlists</h2>
            </div>
        );
    }
}

export default PlaylistCounter;