import React from 'react';

import {projects} from './assets/data/projectData.js';

class Homepage extends React.Component {
  // define initial states and bind functions
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div id="projectListing">
        {projects.map((data, key) => {
          return (
            <div className="project" key={data.id}>
              <img className="poster" src={data.poster} alt={data.name} />
              <img className="logo" src={data.logo} alt={data.name} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Homepage;
