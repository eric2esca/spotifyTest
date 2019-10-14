import React, { Component } from 'react';
import HoursCounter from './components/HoursCounter/HoursCounter';
import PlaylistCounter from './components/PlaylistCounter/PlaylistCounter';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';
import queryString from 'query-string';
import { promised } from 'q';

class App extends Component{
  state = {
    serverData: {},
    filterString: ''
  }

  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if(!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.setState({ 
        user: {
          name: data.display_name
        }
      }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => { 
          let responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken}
          })
          let trackDataPromise = responsePromise
            .then(response => response.json())
          return trackDataPromise
        })
        let allTracksDatasPromises =
          Promise.all(trackDataPromises)
          let playlistsPromise = allTracksDatasPromises.then(trackDatas => {
            trackDatas.forEach((trackData, i) => {
              playlists[i].trackDatas = trackData.items
                .map(item => item.track)
                .map(trackData => ({
                  name: trackData.name,
                  duration: trackData.duration_ms / 1000
                }))
            })
            return playlists
          })
          return playlistsPromise
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          return{
            name: item.name,
            imageUrl: item.images[0].url,
            songs: item.trackDatas.slice(0, 3)
          }
        })
      }));
  }

  render(){
    let playlistToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())) 
        : []

    return(
      <div className='App'>
        <h1>House Tunes v0.0.1</h1>
        {this.state.user ?
        <div>
          <h1 style={{'fontSize': '54px'}}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistToRender.map( playlist => 
            <Playlist playlist={playlist} key={Math.random()}/>
          )}
        </div> : <button 
                  onClick={() => {
                    window.location = window.location.href.includes('localhost') 
                    ? 'http://localhost:8888/login'
                    : 'https://spotify-auth-ee.herokuapp.com/login'
                  }}
                  style={{padding: '20px', 'fontSize': '50px', 'marginTop': '20px'}}>
                    Sign In with Spotify
                  </button>
        }
      </div>
    )
  }
}

export default App;
