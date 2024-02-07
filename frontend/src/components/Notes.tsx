//import React, { Component } from 'react'
import { Component } from "react";
import { fetchData } from "../App";

interface NotesPropsType {
  //isVisible: boolean
}

interface NotesStateType {
  //isVisible: boolean,
  apiData: ApiDataType[]
}

interface ApiDataType {
  id: number,
  content: string
}

export default class Notes extends Component<NotesPropsType, NotesStateType> {
  constructor(props: NotesPropsType) {
    super(props);

    this.state = {
      //isVisible: this.props.isVisible,
      apiData: []
    }
  }

  reload = () => {
    fetchData('GET', undefined, (jsonData: ApiDataType[]) => {
      this.setState({apiData: jsonData});
    })
  }

  componentDidMount(): void {
    // fetchData('GET', undefined, (jsonData: ApiDataType[]) => {
    //   this.setState({apiData: jsonData});
    // })
    this.reload();
  }

  handleNoteClose = (id: number) => {
    console.log('CLOSE:', id);
    fetchData('DELETE', id.toString(), () => {
      console.log('DELETE set state');
      //this.setState({apiData: []});
      // fetchData('GET', undefined, (jsonData: ApiDataType[]) => {
      //   this.setState({apiData: jsonData});
      // })
      this.reload();
    })
  }

  

  render() {
    return (
      <div className="notes"> 
        <div className="notes-reload" onClick={this.reload}>Обновить</div>
        {this.state.apiData.map(data => 
          <div key={data.id} className="note">
            <div className="note-content">{data.content}</div>
            <div className="note-close" onClick={() => this.handleNoteClose(data.id)}>X</div>
          </div>)}
      </div>
    )
  }
}
