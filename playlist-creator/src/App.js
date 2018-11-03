import React, { Component } from "react";

import "./App.css";
import Form from "./components/form";
import Playlist from "./components/playlist";

class App extends Component {
  state = {
    artist: []
  };
  getArtist = e => {
    e.preventDefault();
    console.log("artist button pressed");
    const art = e.target.elements.artist.value;
    console.log(art);
    var parts = art.split(',');
    var newArray = [];
    var i;
    for(i=0; i<parts.length;i++){
      newArray.push({name: parts[i]});
    }
    
    console.log(newArray);
    this.setState({
      artist: this.state.artist.concat(newArray)
    });
    console.log(this.state.artist);
  };
  render() {
    return (
      <div className="App">
        <h1>Spotify Playlist Creator</h1>
        <div><Form getArtist={this.getArtist} /></div>
        
        <Playlist artist={this.state.artist}/>
      </div>
    );
  }
}

export default App;
