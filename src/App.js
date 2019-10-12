import React, { Component } from 'react';
import HoursCounter from './components/HoursCounter/HoursCounter';
import PlaylistCounter from './components/PlaylistCounter/PlaylistCounter';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';
import queryString from 'query-string';

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
      .then(data => this.setState({ 
        playlists: data.items.map(item => {
          console.log(data.items)
          return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
          }
        })
      }))
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
                    window.location = window.location.includes('localhost') 
                    ? 'http://localhost:8888/login'
                    : 'https://spotify-oauth-backend26.herokuapp.com/login'
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
