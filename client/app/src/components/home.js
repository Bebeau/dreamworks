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
      errorInfo: null,
      clicked: false
    };
    this.onTemplateOpen = this.onTemplateOpen.bind(this);
    this.onTemplateClose = this.onTemplateClose.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  componentDidMount() {
    let slug = window.location.pathname.replace("/", "");
    projects.forEach((data, key) => {
      if(data.slug === slug) {
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
          gallery: data.inner.gallery,
          clicked: true
        });
        // lock body scrll
        document.body.classList.add("lock");
        // auto scroll body to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // update url path
        window.history.replaceState({}, data.name, data.slug);
      }
    });
  }
  onTemplateOpen(e) {
    // get clicked project id
    let id = e.target.closest(".project").getAttribute("data-id");
    // check if data exists
    projects.forEach((data, key) => {
      // if match, set data and show inner view
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
          gallery: data.inner.gallery,
          clicked: true
        });
        // lock body scrll
        document.body.classList.add("lock");
        // auto scroll body to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // update url path
        window.history.replaceState({}, data.name, data.slug);
      }
    });
  }
  onTemplateClose() {
    // hide inner view
    this.setState({
      clicked: false
    });
    // lock body scrll
    document.body.classList.remove("lock");
    // auto scroll body to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // auto scroll project to top
    document.getElementById('innerPageTemplate').scrollTo({ top: 0, behavior: 'smooth' });
    // update url path
    window.history.replaceState({}, "Dreamworks", "/");
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
      <div id="pageWrap" className={this.state.clicked ? 'inner': null}>
        <Header onClick={this.onTemplateClose} />
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
          onClick={this.onTemplateClose}
        />
        <div id="homePage">
          <div className="mainBanner"></div>
          <div id="projectListing">
            {projects.map((data, key) => {
              return (
                <div className="project" key={data.id} data-id={data.id} onClick={this.onTemplateOpen}>
                  <article>
                    <img className="poster" src={data.poster} alt={data.name} />
                    <img className="logo" src={data.logo} alt={data.name} />
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
