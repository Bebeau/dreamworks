import React from 'react';

import Header from './header.js';
import Footer from './footer.js';

import Inner1 from './inner1.js';

import {projects} from '../assets/data/projectData.js';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateData: '',
    }
    this.onTemplate = this.onTemplate.bind(this);
  }
  onTemplate(e) {
    let id = e.target.closest(".project").getAttribute("data-id");
    projects.forEach((data, key) => {
      if(key === parseInt(id)) {
        this.setState({
          templateData: data.inner
        });
      }
    });
  }
  render() {
    const {
      templateData
    } = this.state;
    return (
      <div>
        <Inner1 
          hero={templateData.hero}
          description={templateData.description}
          credits={templateData.credits}
          streaming={templateData.streaming}
          items={templateData.items}
          bonus={templateData.bonus}
          consideration={templateData.consideration}
          gallery={templateData.gallery}
        />
        <Header />
        <div className="mainBanner"></div>
        <div id="projectListing">
          {projects.map((data, key) => {
            return (
              <div className="project" key={data.id} data-id={data.id} onClick={this.onTemplate}>
                <article>
                  <img className="poster" src={data.poster} alt={data.name} />
                  <img className="logo" src={data.logo} alt={data.name} />
                </article>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
