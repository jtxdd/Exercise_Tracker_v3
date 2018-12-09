import React from 'react';

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      taken: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  handleResult(res) {
    res.then(result => {
      if (result.result) {
        this.props.history.push('/', {result: 'success', response: result})
      } else {
        this.setState(prev => ({taken: !prev.taken}));
      }
    });
  }
  
  handleError(err) {
    err.then(error => console.log(error));
  }
  
  handleChange(e) {    
    let name = e.target.name;
    let value = e.target.value;
    
    if (this.state.taken) {
      this.setState({ [name]: value, taken: false });
    } else {
      this.setState({ [name]: value });
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let options = {
      method: 'POST', 
      body: JSON.stringify({username: this.state.username}), 
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };
    fetch('/new', options)
      .then(res => res.ok ? this.handleResult(res.json()) : this.handleError(res.json()));
  }
  
  handleCancel() {
    this.props.history.push('/');
  }
  
  render() {
    return(
      <form className="container d-flex flex-column w-50 mt-5" onSubmit={this.handleSubmit}>
        <h3>Add User</h3>
        <div className={this.state.taken ? 'input-group' : 'input-group mb-3'}>
          <div className="input-group-prepend">
            <span className="input-group-text">Username</span>
          </div>
          <input 
            type="text" 
            className={this.state.taken ? 'form-control invalid' : 'form-control'} 
            name="username" 
            onChange={this.handleChange} 
            value={this.state.username} 
            placeholder="Username*" 
            required 
          />
        </div>
        <div className={this.state.taken ? 'show-help' : 'hide-help'}>
          <small className="form-text text-muted pt-1 pb-2 ml-2">Username taken, try a different username.</small>
        </div>
        <div>
          <button className="btn btn-primary mx-1">Submit</button>
          <button className="btn btn-danger mx-1" onClick={this.handleCancel} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export { New };