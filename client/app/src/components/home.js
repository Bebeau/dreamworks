import React from 'react';

import Header from './header.js';
import Footer from './footer.js';

import Inner from './single.js';
import Gallery from './gallery.js';

import {projects} from '../assets/data/projectData.js';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null, 
      errorInfo: null,
      clicked: false,
      modalActive: false,
      galleryImages: false,
      activeImage: 0
    };
    this.onTemplateOpen = this.onTemplateOpen.bind(this);
    this.onTemplateClose = this.onTemplateClose.bind(this);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.changeSlide = this.changeSlide.bind(this);
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
    let slug = window.location.pathname.replace("/","");
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
        window.scrollTo({ top: 0 });
        // update url path
        window.history.replaceState({}, data.name, data.slug);
      }
    });
    document.getElementById("mainVideo").contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
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
    document.getElementById("mainVideo").contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
  }
  showModal(e) {
    let modal = document.getElementById("innerModal");
    
    if(e.target.closest(".item")) {
      // if article link, redirect to link
      if(e.target.closest(".item").hasAttribute('data-link')) {
        let articleLink = e.target.closest(".item").getAttribute("data-link");
        window.open(articleLink);
      }
      // if video link launch modal
      if(e.target.closest(".item").hasAttribute('data-video')) {
        // Create an iFrame with autoplay set to true
        let videoLink = e.target.closest(".item").getAttribute("data-video"),
            iframeWrap = document.createElement("article"),
            iframe = document.createElement("iframe")
        // set attributes
        iframe.setAttribute("src",videoLink);
        iframe.setAttribute("frameborder",0);
        iframe.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", 1);
        iframe.setAttribute("autoplay", 1);
        iframe.setAttribute("id", "videoIframe");

        iframeWrap.setAttribute("id", "videoRatioWrap");
        iframeWrap.appendChild(iframe);
        // append iframe to video modal
        modal.appendChild(iframeWrap);
      }
    }
    if(e.target.closest(".innerGallery")) {
      this.setState({
        galleryImages: this.state.gallery.images
      });
    }
    if(e.target.closest(".innerConsideration")) {
      this.setState({
        galleryImages: this.state.consideration.images
      });
    }
    // change state
    this.setState({
      modalActive: true
    });
    this.hideModal(this);
  }
  hideModal(e) {
    // define vars
    let body = document.getElementById('innerModal'),
        videoWrap = document.getElementById('videoRatioWrap');
    // add click listener to modal body
    body.addEventListener("click", function(event) {
        if(videoWrap) {
          videoWrap.remove();
        }
        if(event.target === event.currentTarget) {
          // change state
          e.setState({
            modalActive: false,
            galleryImages: false,
            activeImage: 0
          });
        }
    }, false);
    // add click listener to inner modal
    if(videoWrap) {
      videoWrap.addEventListener("click", function(e) {
          e.stopPropagation();
      }, false);
    }
  }
  changeSlide(e) {
    let direction = e.target.closest("article").getAttribute("data-arrow"),
        index = this.state.activeImage;

    if(direction === "prev") {
      index = this.state.activeImage === 0 ? this.state.galleryImages.length -1 : this.state.activeImage - 1;
    }
    if(direction === "next") {
      index = this.state.activeImage === this.state.galleryImages.length -1 ? 0 : this.state.activeImage + 1;
    }
    // assign the logical index to currentImageIndex that will use in render method
    this.setState({
      activeImage: index
    })
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
      gallery,
      modalActive,
      galleryImages,
      activeImage
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
        <section id="innerModal" className={modalActive  ? 'projectModal show': 'projectModal'}>
          <Gallery
            images={galleryImages}
            changeSlide={this.changeSlide}
            activeImage={activeImage}
          />
        </section>
        <Header onClick={this.onTemplateClose} />
        <Inner
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
          modalActive={this.showModal}
        />
        <div id="homePage">
          <div className="mainBanner">
            <iframe id="mainVideo" src="https://www.youtube.com/embed/25UHUbpFTtY?autoplay=1&version=3&enablejsapi=1" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
          </div>
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
