import React, { Component } from 'react';
import HoursCounter from './components/HoursCounter/HoursCounter';
import PlaylistCounter from './components/PlaylistCounter/PlaylistCounter';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Eric',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      }
    ]
  }
};

class App extends Component{
  state = {
    serverData: {},
    filterString: ''
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render(){
    return(
      <div className='App'>
        <h1>House Tunes v0.0.1</h1>
        {this.state.serverData.user ?
        <div>
          <h1 style={{'fontSize': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {this.state.serverData.user.playlists.filter(playlist => 
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map( playlist => 
            <Playlist playlist={playlist} key={Math.random()}/>
          )
          }
        </div> : <div className="lds-hourglass"></div>
        }
      </div>
    )
  }
}

export default App;
