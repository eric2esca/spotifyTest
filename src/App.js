import React, { Component } from 'react';
import Aggregate from './components/Aggregate/Aggregate';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';

class App extends Component{
  render(){
    let name = 'Eric';
    let green = '#FF1212';
    let headerStyle = {color: green, 'font-size': '50px'};
    return(
      <div className='App'>
        <h1>House Tunes v0.0.1</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    )
  }
}

export default App;
