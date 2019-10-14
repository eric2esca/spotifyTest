import React, { Component } from 'react';
import '../PlaylistCounter/playlistCounter.css';

class HoursCounter extends Component {
    render() {
      let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
      }, [])
      let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration
      }, 0)
      return (
        <div className='counter'>
          <h2>{(totalDuration/60/60).toFixed(2)} hours</h2>
        </div>
      );
    }
  }

  export default HoursCounter;