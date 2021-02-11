import React from 'react';

import Header from './header.js';
import Footer from './footer.js';

import Inner1 from './inner1.js';

import {projects} from '../assets/data/projectData.js';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null, 
      errorInfo: null
    };
    this.onTemplate = this.onTemplate.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  onTemplate(e) {
    let id = e.target.closest(".project").getAttribute("data-id");
    projects.forEach((data, key) => {
      if(key === parseInt(id)) {
        this.setState({
          layout: data.layout,
          logo: data.logo,
          hero: data.inner.hero,
          description: data.inner.description,
          credits: data.inner.credits,
          streaming: data.inner.streaming,
          items: data.inner.items,
          bonus: data.inner.bonus,
          consideration: data.inner.consideration,
          gallery: data.inner.gallery
        });
      }
    });
  }
  render() {
    const {
      layout,
      logo,
      hero,
      description,
      credits,
      streaming,
      items,
      bonus,
      consideration,
      gallery
    } = this.state;
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return (
      <div>
        <Inner1 
          layout={layout}
          logo={logo}
          hero={hero}
          description={description}
          credits={credits}
          streaming={streaming}
          items={items}
          bonus={bonus}
          consideration={consideration}
          gallery={gallery}
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
