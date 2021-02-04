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
      <div className="projectListing">
        {projects.map((data, key) => {
          return (
            <div className="project" key={data.id}>
              <img class="poster" src={data.poster} alt={data.name} />
              <img class="logo" src={data.logo} alt={data.name} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Homepage;
