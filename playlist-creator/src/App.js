import React, { Component } from "react";

import "./App.css";
import Form from "./components/form";
import Playlist from "./components/playlist";

class App extends Component {
  constructor(){
    super();
    this.state= {
      serverData: {}
    }
  }
  state = {
    access_token: undefined,
    artist: []
  };
  componentDidMount(){
    var urlSearch = new URLSearchParams(window.location.search).get('access_token');
    if(urlSearch) this.setState({access_token: urlSearch})
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + urlSearch}
    }).then((response) => response.json().then(data => this.setState({access_token: urlSearch})))
  }
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
    
    if(this.state.artist!==undefined){
     var a = this.state.artist.concat(newArray);
      this.setState({
        artist: a
      })
    }else{
      this.setState({
        artist: newArray
      });
    }
    
    console.log(this.state.artist);
  };
  
  render() {
    return (
      <div className="App">
      {this.state.access_token ?
      <div>
        <h1>Spotify Playlist Creator</h1>
        <div><Form getArtist={this.getArtist} /></div>
        
        <Playlist artist={this.state.artist}/>
      </div> : <button onClick={()=> window.location ='http://localhost:8888/login'} 
      style={{padding: '20px', 'fontSize': '50px', 'marginTop': '20px'}}> Sign in </button>
      }

      </div> 
      

    );
  }
}

export default App;
