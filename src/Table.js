import React from 'react';

const Header_Row = () => {
  return(
    <div className="row border-bottom border-top border-dark">
      <div className="col-sm-4 font-weight-bold">
        <h5>Description</h5>
      </div>
      <div className="col-sm-4 font-weight-bold">
        <h5>Duration</h5>
      </div>
      <div className="col-sm-4 font-weight-bold text-center">
        <h5>Date</h5>
      </div>
    </div>
  );
};

const Date_Col = (props) => {
  return(
    <div className="col-sm-4">
      {props.datePart}
    </div>
  );
};

const Data_Row = (props) => {
  const formatter = (item, x) => {
    let options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
    let format = {
      date: new Date(x).toLocaleString([], options).split(','),
      mins: x < 10 ? '0' + x : x,
      border: x % 2 === 0 ? 'row bg-grey border-secondary border-bottom' : 'row border-bottom border-dark'
    };
    return format[item];
  };
  return( 
    <div className={formatter('border', props.index)}>
      <div className="col-sm-4 text-capitalize">{props.data.description}</div>
      <div className="col-sm-4">{formatter('mins', +props.data.duration)} mins</div>
      <div className="col-sm-4">
        <div className="row">
          {formatter('date', props.data.date).map((el, i) => 
            <Date_Col key={`date_${i}`} datePart={el} />
          )}
        </div>
      </div>
    </div>
  );
};

const Total_Row = (props) => {
  return(
    <h4 className="mt-1 ml-1 font-weight-bold">Exercises: {props.count}</h4>
  );
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [], 
      filtered: {}
    };
    this.handleClose  = this.handleClose.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleError  = this.handleError.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  
  componentDidMount() {
    fetch(this.props.location.state.route)
      .then(res => res.ok ? this.handleResult(res.json()) : this.handleError(res.json()));
  }
  
  handleResult(res) {
    res.then(result => {
      let filter = this.props.location.state.query;
      
      if (filter) {
        this.handleFilter(result.result, filter);
      } else {
        let filtered = this.state.filtered;
        filtered.logs = result.result.sort((a,b) => new Date(a.date) - new Date(b.date));
        this.setState({ logs: result.result, filtered: filtered });
      }
    });
  }
  
  handleFilter(logs, filter) {    
    let filtered = this.state.filtered;
    
    const dateFilter = (logs, arg) => {
      let filter_on = {
        from: logs.filter(el => new Date(el.date) >= new Date(filter.from_date)),
        to: logs.filter(el => new Date(el.date) <= new Date(filter.to_date)),
        limit: logs
      };
      return filter_on[arg].sort((a,b) => new Date(a.date) - new Date(b.date));
    };
    
    if (filter.from_date) {
      filtered.from_date = dateFilter(logs, 'from');
      filtered.logs = [...filtered.from_date];
    }
    
    if (filter.to_date) {
      filtered.to_date = dateFilter(logs, 'to');
      filtered.logs = [...filtered.logs, ...filtered.to_date];
    }
    
    if (filter.limit) {
      if (filtered.logs.length > 0) {
        filtered.limit = filtered.logs.slice(0, filter.limit);
        filtered.logs = [...filtered.limit];
      } else {
        filtered.limit = dateFilter(logs, 'limit').slice(0, filter.limit);
        filtered.logs = [...filtered.limit];
      }
    }
    
    this.setState({logs: logs, filtered: filtered });
  }
  
  handleError(err) {
    err.then(error => console.log(error));
  }
  
  handleClose() {
    this.props.history.push('/');
  }
  
  render() {
    return(
      <div className="container border border-dark p-3">
        <div className="clearfix">
          <div className="float-left">
            <h4>Logs</h4>
          </div>
          <div className="float-right">
            <button className="btn btn-sm btn-danger" type="button" onClick={this.handleClose}>
              <span className="fas fa-times"></span>
            </button>
          </div>
        </div>
        <Header_Row />
        {this.state.filtered.logs && this.state.filtered.logs.map((el, i) => 
          <Data_Row key={'row_' + i} data={el} index={i} />
        )}
        <Total_Row count={this.state.filtered.logs && this.state.filtered.logs.length} />
      </div>
    );
  }
}

export { Table };



/*
let array = [];
      if (arg === 'from') {
         array = logs.filter(el => new Date(el.date) >= new Date(filter.from_date));
      } else if (arg === 'to') {
        array = logs.filter(el => new Date(el.date) <= new Date(filter.to_date));
      } else {
        array = logs;
      }
      
      return array.sort((a,b) => new Date(a.date) - new Date(b.date));
*/


/*
if (filter.from_date) {
      filtered.from_date = dateFilter(logs, 'from');
      filtered.logs = [...filtered.from_date];
      //filtered.from_date = logs.filter(el => new Date(el.date) >= new Date(filter.from_date));
      //filtered.logs = filtered.from_date.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    
    if (filter.to_date) {
      filtered.to_date = dateFilter(logs, 'to');
      filtered.logs = [...filtered.logs, ...filtered.to_date];
      //filtered.to_date = logs.filter(el => new Date(el.date) <= new Date(filter.to_date));
      //filtered.logs = [...filtered.logs, ...filtered.to_date].sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    
    if (filter.limit) {
      if (filtered.logs.length > 0) {
        filtered.limit = filtered.logs.slice(0, filter.limit);
      } else {
        filtered.limit = logs.sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, filter.limit);
        filtered.logs = filtered.limit;
      }
    }
*/