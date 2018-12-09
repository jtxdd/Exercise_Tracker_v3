import React from 'react';

const Header_Row = () => {
  return(
    <div className="row border-bottom border-top border-dark">
      <div className="col-sm-2 font-weight-bold">
        <small>#</small>
      </div>
      <div className="col-sm-5 font-weight-bold">
        <h5>Username</h5>
      </div>
      <div className="col-sm-5 font-weight-bold">
        <h5>User ID</h5>
      </div>
    </div>
  );
};

const Data_Row = (props) => {
  return( 
    <div className="row border-bottom">
      <div className="col-sm-2">{props.index}</div>
      <div className="col-sm-5">{props.username}</div>
      <div className="col-sm-5">{props.id}</div>
    </div>
  );
};

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.handleUsers = this.handleUsers.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount() {
    fetch('/users')
      .then(res => res.ok ? this.handleUsers(res.json()) : this.handleError(res.json()));
  }
  
  handleUsers(res) {
    res.then(result => this.setState({ users: result.result }));
  }
  
  handleError(res) {
    res.then(error => console.log(error));
  }
  
  handleClose() {
    this.props.history.push('/');
  }
  
  render() {
    return(
      <div className="container border clearfix mt-5">
        <div className="float-left">
          <Header_Row />
          {this.state.users && this.state.users.map((el, i) =>
            <Data_Row key={'user_' + i} index={i} username={el.username} id={el._id} />
          )}
        </div>
        <div className="float-right">
          <button className="btn btn-sm btn-danger" onClick={this.handleClose}>
            <span className="fas fa-times"></span>
          </button>
        </div>
      </div>
    );
  }
}

export { Users };