import React, { Component } from "react";

import "./App.css";
import Form from "./components/form";
import Playlist from "./components/playlist";
import { Alert } from "../node_modules/react-bootstrap";

function parse(string){
  var a = encodeURIComponent(string)
  return a;
}
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
    id: [],
    data: undefined,
    error: undefined
  };
  componentDidMount(){
    var urlSearch = new URLSearchParams(window.location.search).get('access_token');
    if(urlSearch) this.setState({access_token: urlSearch})
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + urlSearch}
    }).then((response) => response.json().then(data => this.setState({access_token: urlSearch, data: data})))
    console.log(this.state.data);
  }
  
  async getID(artist){
    var urlSearch = new URLSearchParams(window.location.search).get('access_token');
    var parsedArtist = parse(artist);
    await fetch(`https://api.spotify.com/v1/search?q=${parsedArtist}&type=artist`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application.json',
        'Authorization': 'Bearer ' + urlSearch}
    }).then((response) => response.json().then(
      data => 
      this.setState({ id: this.state.id.concat(data.artists.items[0].id)})
    ))
  }
  async getTracks(){
    var urlSearch = new URLSearchParams(window.location.search).get('access_token');
    var id = this.state.id;
    //console.log(id);
    fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
      method: 'GET',
      headers: {
        'country': 'US',
        'Accept': 'application/json',
        'Content-Type': 'application.json',
        'Authorization': 'Bearer ' + urlSearch}
    }).then((response) => response.json().then(data => console.log(data)))
  }

  clearList = a => {
    this.setState({
      artist: []
    })
  }
  genList = async c => {
    var urlSearch = new URLSearchParams(window.location.search).get('access_token');
    console.log(urlSearch);
    console.log(this.state.data);
    
    var art = this.state.artist[0].name;
    var v = parse(art);

    for(var i = 0; i<this.state.artist.length; i++){
      this.getID(this.state.artist[i].name);
    }
    console.log(this.state.id);

    /*var id = this.state.id;
    console.log(id);
    await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application.json',
        'Authorization': 'Bearer ' + urlSearch}
    }).then((response) => response.json().then(data => console.log(data)))*/
  
    s
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
        
        <Playlist genList={this.genList} clearList={this.clearList} artist={this.state.artist}/>
      </div> : <div className="container"><p>Please sign into Spotify</p><button onClick={()=> window.location ='http://localhost:8888/login'} 
      className="signInButton"> Sign in </button></div>
      }

      </div> 
      

    );
  }
}

export default App;
