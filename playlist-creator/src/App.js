import React, { Component } from "react";

import "./App.css";
import Form from "./components/form";
import Playlist from "./components/playlist";
import { Alert } from "../node_modules/react-bootstrap";

class App extends Component {
  constructor(){
    super();
    this.state= {
      serverData: {}
    }
  }
  state = {
    access_token: undefined,
    artist: [],
    error: undefined
  };
  componentDidMount(){
    var urlSearch = new URLSearchParams(window.location.search).get('access_token');
    if(urlSearch) this.setState({access_token: urlSearch})
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + urlSearch}
    }).then((response) => response.json().then(data => this.setState({access_token: urlSearch})))
  }

  clearList = a => {
    this.setState({
      artist: []
    })
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
      newArray.push({name: parts[i].trim()});
    }
    console.log(newArray);

    var artist = this.state.artist;
    /*for(var a1 in newArray){
      for(var a2 in artist){
        if(a1 === a2){
          newArray.splice(newArray.indexOf(a1), 1);
          break;
        }
      }
    }*/
    

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
        
        <Playlist clearList={this.clearList} artist={this.state.artist}/>
      </div> : <div className="container"><p>Please sign into Spotify</p><button onClick={()=> window.location ='http://localhost:8888/login'} 
      className="signInButton"> Sign in </button></div>
      }

      </div> 
      

    );
  }
}

export default App;
