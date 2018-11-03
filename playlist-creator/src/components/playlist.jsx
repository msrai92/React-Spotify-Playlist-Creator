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
      artists: a
    });
  }
  render() {
    return (
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            <tbody>
              {this.state.artists.map(artist => {
                return (
                  <tr>
                    <td>{artist.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Playlist;
