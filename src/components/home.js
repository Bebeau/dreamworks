import React from 'react';
// import { BrowserView, MobileView } from 'react-device-detect';

import {images} from '../assets/data/projectData2.js';
import {projects} from '../assets/data/projectData2.js';

import Header from './header.js';
import Footer from './footer.js';

import Inner from './single.js';
import Gallery from './gallery.js';
import Hero from '../assets/img/mainHero_2021.jpg';

import IntroMP4 from '../assets/video/intro.mp4';
import IntroWebM from '../assets/video/intro.webm';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      errorInfo: null,
      clicked: false,
      modalActive: false,
      galleryImages: false,
      activeImage: 0,
      muted: true,
      loading: true
    };
    this.onTemplateOpen = this.onTemplateOpen.bind(this);
    this.onTemplateClose = this.onTemplateClose.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
    this.backTrigger = this.backTrigger.bind(this);
    this.unMute = this.unMute.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  componentDidMount() {

    window.addEventListener("popstate", this.backTrigger);

    let imagePreload = images.map(function(item){
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = item;
        img.onload = function(){
          resolve();
        }
      })
    })

    Promise.all(imagePreload)
    .then(() => {
      console.log('IMAGES HAVE BEEN LOADED!!!');
      this.setState({
        loading: false
      })
    })

    window.history.pushState({}, "Dreamworks Animation Studio", "./");
    window.history.replaceState({}, "Dreamworks Animation Studio", "./");

    let slug = window.location.pathname.split("/").pop();
    if(slug !== "") {
      projects.forEach((data, key) => {
        if(data.slug === slug) {
          this.setState({
            slug: data.slug,
            layout: data.layout,
            logo: data.logo,
            logo2: data.logo2,
            hero: data.inner.hero,
            copyright: data.inner.copyright,
            description: data.inner.description,
            credits: data.inner.credits,
            streaming: data.inner.streaming,
            items: data.inner.items,
            bonus: data.inner.bonus,
            consideration: data.inner.consideration,
            gallery: data.inner.gallery,
            clicked: true
          });
          document.body.classList.add("lock");
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState({}, data.name, data.slug);
          window.history.replaceState({}, data.name, data.slug);
        }
      });
    }
  }
  backTrigger(event) {
    event.stopPropagation();
    let slug = window.location.pathname.split("/").pop();
    if(slug === "") {
      this.setState({
        clicked: false
      });
      document.body.classList.remove("lock");
      document.getElementById('innerPageTemplate').scrollTo({ top: 0, behavior: 'smooth' });
    }
    if(slug !== "") {
      projects.forEach((data, key) => {
        if(data.slug === slug) {
          this.setState({
            slug: data.slug,
            layout: data.layout,
            logo: data.logo,
            hero: data.inner.hero,
            copyright: data.inner.copyright,
            description: data.inner.description,
            credits: data.inner.credits,
            streaming: data.inner.streaming,
            items: data.inner.items,
            bonus: data.inner.bonus,
            consideration: data.inner.consideration,
            gallery: data.inner.gallery,
            clicked: true
          });
          document.body.classList.add("lock");
        }
      });
    }
  }
  onTemplateOpen(e) {
    let id = e.target.closest(".project").getAttribute("data-id");
    projects.forEach((data, key) => {
      if(key === parseInt(id)) {
        this.setState({
          slug: data.slug,
          layout: data.layout,
          logo: data.logo,
          hero: data.inner.hero,
          copyright: data.inner.copyright,
          description: data.inner.description,
          credits: data.inner.credits,
          streaming: data.inner.streaming,
          items: data.inner.items,
          bonus: data.inner.bonus,
          consideration: data.inner.consideration,
          gallery: data.inner.gallery,
          clicked: true
        });
        document.body.classList.add("lock");
        window.scrollTo({ top: 0 });
        window.history.pushState({}, data.name, data.slug);
        window.history.replaceState({}, data.name, data.slug);
      }
    });
  }
  onTemplateClose() {
    this.setState({
      clicked: false
    });
    document.body.classList.remove("lock");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('innerPageTemplate').scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, "Dreamworks Animation Studio", "./");
    window.history.replaceState({}, "Dreamworks Animation Studio", "./");
  }
  showModal(e) {
    let modal = document.getElementById("innerModal");
    
    if(e.target.closest(".item")) {
      if(e.target.closest(".item").hasAttribute('data-link')) {
        let articleLink = e.target.closest(".item").getAttribute("data-link");
        window.open(articleLink);
        return;
      }
      if(e.target.closest(".item").hasAttribute('data-video') && e.target.closest(".item").getAttribute('data-video') !== "") {
        let videoLink = e.target.closest(".item").getAttribute("data-video"),
            iframeWrap = document.createElement("article"),
            iframe = document.createElement("iframe")
        iframe.setAttribute("src",videoLink);
        iframe.setAttribute("frameborder",0);
        iframe.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", 1);
        iframe.setAttribute("autoplay", 1);
        iframe.setAttribute("title", "");
        iframe.setAttribute("id", "videoIframe");
        iframeWrap.setAttribute("id", "videoRatioWrap");
        iframeWrap.appendChild(iframe);
        modal.appendChild(iframeWrap);
        window.screen.orientation.lock("landscape-primary");
      }
    }
    if(e.target.closest(".innerGallery") && !e.target.closest(".innerGallery").classList.contains('video')) {
      if(e.target.hasAttribute('data-link')) {
        let articleLink = e.target.getAttribute("data-link");
        window.open(articleLink);
        return;
      }
      this.setState({
        galleryImages: this.state.gallery.images
      });
    }
    if(e.target.closest(".innerConsideration") && !e.target.closest(".innerConsideration").classList.contains('video')) {
      this.setState({
        galleryImages: this.state.consideration.images
      });
    }
    this.setState({
      modalActive: true
    });
    this.hideModal(this);
  }
  hideModal(e) {
    let body = document.getElementById('innerModal'),
        videoWrap = document.getElementById('videoRatioWrap');
    body.addEventListener("click", function(event) {
        if(videoWrap) {
          videoWrap.remove();
        }
        if(event.target === event.currentTarget) {
          e.setState({
            modalActive: false,
            galleryImages: false,
            activeImage: 0
          });
        }
    }, false);
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
    this.setState({
      activeImage: index
    })
  }
  unMute() {
    let video = document.getElementById('introVideo');
    video.muted = !video.muted;
    this.setState({
      muted: !this.state.muted
    })
  }
  render() {
    const {
      slug,
      layout,
      logo,
      hero,
      copyright,
      description,
      credits,
      streaming,
      items,
      bonus,
      consideration,
      gallery,
      modalActive,
      galleryImages,
      activeImage,
      clicked
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

        <div id="loading" className={this.state.loading ? null : 'show'}>
          <article>
            loading...
          </article>
        </div>

        <section id="innerModal" className={modalActive  ? 'projectModal show': 'projectModal'}>
          <Gallery
            images={galleryImages}
            changeSlide={this.changeSlide}
            activeImage={activeImage}
          />
        </section>
        <Header 
          projects={projects}
          onTemplateOpen={this.onTemplateOpen}
          onTemplateClose={this.onTemplateClose}
        />
        <Inner
          slug={slug}
          layout={layout}
          logo={logo}
          hero={hero}
          copyright={copyright}
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
          {/*<BrowserView>
            <div className={this.state.muted ? 'mainBanner': 'mainBanner sound'}>
              <video id="introVideo" poster={Hero} playsInline autoPlay muted loop onClick={this.unMute}>
                <source src={IntroWebM} type="video/webm" />
                <source src={IntroMP4} type="video/mp4" />
              </video>
            </div>
          </BrowserView>
          <MobileView>
            <div className="mainBanner" style={{backgroundImage: `url(${Hero})`}} onClick={this.bannerAnchor}>
            </div>
          </MobileView>*/}
          <div className={this.state.muted ? 'mainBanner': 'mainBanner sound'}>
            <video id="introVideo" poster={Hero} playsInline autoPlay muted loop onClick={this.unMute}>
              <source src={IntroWebM} type="video/webm" />
              <source src={IntroMP4} type="video/mp4" />
            </video>
          </div>
          <div id="projectListing">
            {projects.map((data, key) => {
              return (
                <div className="project" key={data.id} data-id={data.id} onClick={this.onTemplateOpen}>
                  <article>
                    <img rel="preload" className="poster" src={data.poster} alt={data.name} />
                    {data.logo2 ? (
                      <img rel="preload" className="logo" src={data.logo2} alt={data.name} />
                    ) : (
                      <img rel="preload" className="logo" src={data.logo} alt={data.name} />
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <Footer
          disabled={clicked}
        />
      </div>
    );
  }
}

export default Homepage;
