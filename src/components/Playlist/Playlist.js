import React, { Component } from 'react';
import './playlist.css';

class Playlist extends Component{
    render(){
        let playlist = this.props.playlist;
        return(
            <div className='color'>
                 <img src={playlist.imageUrl} />
                <h3>{playlist.name}</h3>
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