import React from 'react';

const Home = (props) => {  
  let display = {
    default: (
      <div>
        <h3 className="mt-5 text-muted">Welcome</h3>
      </div>
    ),
    success: (
      <div className="clearfix">
        <h1 className="font-weight-bold p-1 text-dark float-left">Exercise Tracer</h1>
        <h2 className="mt-3 float-right fadeOut">
          <span className="badge badge-success">Success</span>
        </h2>
      </div>
    ),
  };
  let current = props.location.state ? props.location.state.result : 'default';
  return display[current];
};

export { Home };