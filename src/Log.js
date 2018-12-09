import React from 'react';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      from_date: '',
      to_date: '',
      limit: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
    
  handleChange(e) {    
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    let { from_date, to_date, limit } = this.state;
    let route = '/log/user?_id=' + this.state._id;
    let optional = ['from_date', 'to_date', 'limit'];
    let obj = {};
    
    [from_date, to_date, limit].forEach((input, i) => {
      if (input) {
        route += '&' + optional[i] + '=' + input;
        obj[optional[i]] = input;
      }
    });
    this.props.history.push(route, {route: route, query: Object.keys(obj).length === 0 ? '' : obj});
  }
  
  handleCancel() {
    this.props.history.push('/');
  }
  
  render() {
    return(
      <form className="container d-flex flex-column w-50 mt-5" onSubmit={this.handleSubmit}>
        <h3>View Logs</h3>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">User Id</span>
            </div>
            <input type="text" className="form-control" name="_id" onChange={this.handleChange} value={this.state._id} placeholder="User Id*" pattern="^([a-zA-Z0-9]){24}$" required />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">From</span>
            </div>
            <input type="date" className="form-control" name="from_date" onChange={this.handleChange} value={this.state.from_date} placeholder="From Date" />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">To</span>
            </div>
            <input type="date" className="form-control" name="to_date" onChange={this.handleChange} value={this.state.to_date} placeholder="To Date" />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Limit</span>
            </div>
            <input type="number" className="form-control" name="limit" onChange={this.handleChange} value={this.state.limit} placeholder="Limit" />
        </div>
        <div>
          <button className="btn btn-primary mx-1">Submit</button>
          <button className="btn btn-danger mx-1" onClick={this.handleCancel} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export { Log };