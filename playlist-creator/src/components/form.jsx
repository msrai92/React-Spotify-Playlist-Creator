import React, { Component } from "react";

class Form extends Component {
  state = {};
  render() {
    return (
      
      <form className="form-container" onSubmit={this.props.getArtist}>
        <input className="input" type="text" name="artist" placeholder="artists" />
        <button className="button">Add</button>
        
      </form>
     
      
    );
  }
}

export default Form;