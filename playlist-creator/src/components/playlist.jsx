import React, { Component } from "react";
import { Table } from "react-bootstrap";
/*
 <ul>
          {this.state.artists.map(artist => {
            return <li key={artist}>{artist.name}</li>;
          })}
        </ul>
*/
class Playlist extends Component {
  state = {
    initialized: undefined,
    artists: []
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.artist !== nextProps.artist) {
      this.getArtist(nextProps.artist);
    }
  }
  getArtist(artist) {
    const a = artist;
    this.setState({
      artists: a,
      initialized: true
    });
  }

  

  render() {
    return (
     
      <div>
        {this.state.initialized &&
        <div>
        <Table responsive stripped >
          <thead>
            <tr>
              <th>Artist</th>
            </tr>
          </thead>
          
            <tbody>
              {this.state.artists.map(artist => {
                return (
                  <tr>
                    <td>{artist.name}</td> 
                  </tr>
                );
              })}
            </tbody>
          
        </Table>
        
    
        <div><button className="clearButton" onClick={this.props.clearList}>clear</button></div>
        
        </div>
        }
      </div>
    );
  }
}

export default Playlist;
