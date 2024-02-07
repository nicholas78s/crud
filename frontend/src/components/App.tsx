import React, { Component } from 'react'
import Notes from './Notes';
import Form from './Form';

export default class App extends Component {
  handleNoteSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>, formData: {}) => {
    e.preventDefault();
    // const {name, value} = (e.target as HTMLInputElement);

    // if (name === 'note')
    //   this.setState({
    //     [name]: value
    //   });
    //this.props.onNoteSubmit(e);
    console.log(formData);
  }

  render() {
    return (
      <>
        <Notes />
        <Form note="" onNoteSubmit={this.handleNoteSubmit}/>
      </>
    )
  }
}
