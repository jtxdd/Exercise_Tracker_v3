import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return(
    <nav className="navbar bg-dark">
      <NavLink to="/" className="navbar-brand mr-5">
        <span className="fas fa-dumbbell mr-2 ico"></span>
        <span className="navbar-text title">Exercise Tracker</span>
      </NavLink>
      <div className="ml-auto">
        <NavLink to="/users" className="mr-4 users">Users</NavLink>
        <NavLink to="/log" className="mr-4 view-logs">View Logs</NavLink>
        <span className="mr-4"></span>
        <NavLink to="/add" className="mr-4 add-log">Add Log</NavLink>
        <NavLink to="/new" className="ml-auto new-user">New User</NavLink>
      </div>
    </nav>
  );
};

export { Nav };