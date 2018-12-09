import React from 'react';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      description: '',
      duration: '',
      date: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  handleResult(res) {
    res.then(result => this.props.history.push('/', {result: 'success', response: result}));
  }
  
  handleError(err) {
    err.then(error => console.log(error));
  }
  
  handleChange(e) {    
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let { _id, description, duration, date } = this.state;
    let options = {
      method: 'POST', 
      body: JSON.stringify({_id, description, duration, date}), 
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };
    fetch('/add', options)
      .then(res => res.ok ? this.handleResult(res.json()) : this.handleError(res.json()));
  }
  
  handleCancel() {
    this.props.history.push('/');
  }
  
  render() {
    return(
      <form className="container d-flex flex-column w-50 mt-5" onSubmit={this.handleSubmit}>
        <h3>Add Exercises</h3>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">User Id</span>
            </div>
            <input type="text" className="form-control" name="_id" onChange={this.handleChange} value={this.state._id} placeholder="User Id*" pattern="^([a-zA-Z0-9]){24}$" required />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Description</span>
            </div>
            <input type="text" className="form-control" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Description*" required />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Duration</span>
            </div>
            <input type="number" className="form-control" name="duration" onChange={this.handleChange} value={this.state.duration} placeholder="Duration*" required />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Date</span>
            </div>
            <input type="date" className="form-control" name="date" onChange={this.handleChange} value={this.state.date} placeholder="Date" />
        </div>
        <div>
          <button className="btn btn-primary mx-1">Submit</button>
          <button className="btn btn-danger mx-1" onClick={this.handleCancel} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export { Add };