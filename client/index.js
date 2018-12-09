import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav } from '../src/Nav.js';
import { Home } from '../src/Home.js';
import { Users } from '../src/Users.js';
import { Add } from '../src/Add.js';
import { New } from '../src/New.js';
import { Log } from '../src/Log.js';
import { Table } from '../src/Table.js';

class App extends React.Component {
  render() {
    return(
      <div>
        <Nav />
        <div className="container mt-2">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/new" component={New} />
            <Route exact path="/log" component={Log} />
            <Route exact path="/log/user" component={Table} />
          </Switch>
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('application'));