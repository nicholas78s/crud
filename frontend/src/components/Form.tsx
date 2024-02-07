import React from 'react'

interface FormPropsType {
  note: string,
  onNoteSubmit: (e: React.FormEvent<HTMLFormElement>, data: {note: string}) => void
}

interface FormStateType {
  note: string
}

export class Form extends React.Component<FormPropsType, FormStateType> {
  constructor (props: FormPropsType) {
    super (props);
    this.state = {note: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onNoteSubmit(e, this.state);
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    
    if (name === 'note')
      this.setState({
        [name]: value
      });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit} >
          <div className="input-container">
            <textarea id="note" name="note" onChange={this.handleChange} value={this.state.note} />
          </div>
          <div className="input-container">
            <input type="submit" value="Добавить" />
          </div>
        </form>
      </div>
    )
  }
}

export default Form