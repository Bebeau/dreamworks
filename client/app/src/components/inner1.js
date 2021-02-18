import React from 'react';

import Footer from './footer.js';

import playIcon from '../assets/img/play.svg';

class inner extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      error: null, 
      errorInfo: null
    };
  }
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }
  render(){
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
    	<div id="innerPageTemplate">

        <section className="innerHero">
          <article className="heroImage mobileHero" style={{backgroundImage: `url(${this.props.hero})`}}>
          </article>
          <article className="heroInfo">
            <img src={this.props.logo} alt="" />
            <div>
              <p>{this.props.description}</p>
              {this.props.credits ? ( 
                this.props.credits.map((data, key) => {
                  return (
                    <cite>
                      <span>{data.label}</span>
                      {data.person}
                    </cite>
                  );
                })
              ): null }
            </div>
          </article> 
          <article className="heroImage" style={{backgroundImage: `url(${this.props.hero})`}}>
          </article>
        </section>

        <section className="wrap">

          <div className="innerStream">
            <h3>Watch Full Episodes On</h3>
            {this.props.streaming ? ( 
              this.props.streaming.map((data, key) => {
                return (
                  <a key={key} href={data.link} target="_blank" rel="noreferrer">
                    <img src={data.logo} alt={data.platform} />
                  </a>
                );
              })
            ): null }
          </div>

          <div className="innerItems">
            <h2>Take A Peek</h2>
            {this.props.items ? (
              this.props.items.map((data, key) => {
                return (
                  <button key={key} className="item" data-video={data.video} onClick={this.props.showVideo}>
                    <div className="itemThumb">
                      <img src={data.poster} alt="" />
                      <i className="play" style={{backgroundImage: `url(${playIcon})`}}></i>
                    </div>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                  </button>
                );
              })
            ): null }
          </div>

          <div className={`innerSecondary ${this.props.layout ? this.props.layout : ''}`}>

            {this.props.consideration && this.props.layout === "second" ? ( 
              <article className="innerConsideration">
                <img src={this.props.consideration.poster} alt="" />
                <div className="considerationInfo">
                  <div>
                    <h5>
                      <span>F</span>
                      <span>o</span>
                      <span>r</span>
                      <span>&amp;</span>
                      <span>S</span>
                      <span>p</span>
                      <span>e</span>
                      <span>c</span>
                      <span>i</span>
                      <span>a</span>
                      <span>l</span>
                      <span>&amp;</span>
                      <span>C</span>
                      <span>o</span>
                      <span>n</span>
                      <span>s</span>
                      <span>i</span>
                      <span>d</span>
                      <span>e</span>
                      <span>r</span>
                      <span>a</span>
                      <span>t</span>
                      <span>i</span>
                      <span>o</span>
                      <span>n</span>
                    </h5>
                    <h3>{this.props.consideration.title}</h3>
                    <p>{this.props.consideration.description}</p>
                  </div>
                  <button className="btn" data-video={this.props.consideration.video}>
                    {this.props.consideration.btnText}
                  </button>
                </div>
              </article>
            ): null }

            {this.props.bonus ? ( 
              <article className="innerBonus">
                <button className="item" data-video={this.props.bonus.video} data-link={this.props.bonus.link}>
                  <div className="itemThumb">
                    <img src={this.props.bonus.poster} alt="" />
                    {this.props.bonus.video ? ( 
                      <i className="play" style={{backgroundImage: `url(${playIcon})`}}></i>
                    ) : null }
                  </div>
                  <h2>Bonus Feature</h2>
                  <h3>{this.props.bonus.title}</h3>
                  <p>{this.props.bonus.description}</p>
                </button>
              </article>
            ): null }
            
            {this.props.consideration && this.props.layout !== "second" ? ( 
              <article className="innerConsideration">
                <img src={this.props.consideration.poster} alt="" />
                <div className="considerationInfo">
                  <div>
                    <h5>
                      <span>F</span>
                      <span>o</span>
                      <span>r</span>
                      <span>&nbsp;</span>
                      <span>S</span>
                      <span>p</span>
                      <span>e</span>
                      <span>c</span>
                      <span>i</span>
                      <span>a</span>
                      <span>l</span>
                      <span>&nbsp;</span>
                      <span>C</span>
                      <span>o</span>
                      <span>n</span>
                      <span>s</span>
                      <span>i</span>
                      <span>d</span>
                      <span>e</span>
                      <span>r</span>
                      <span>a</span>
                      <span>t</span>
                      <span>i</span>
                      <span>o</span>
                      <span>n</span>
                    </h5>
                    <h3>{this.props.consideration.title}</h3>
                    <p>{this.props.consideration.description}</p>
                  </div>
                  <button className="btn" data-video={this.props.consideration.video}>
                    {this.props.consideration.btnText}
                  </button>
                </div>
              </article>
            ): null }

            {this.props.gallery ? ( 
              <article className="innerGallery" style={{backgroundImage: `url(${this.props.gallery.poster})`}}>
                <div className="galleryInfo">
                  <h3>{this.props.gallery.title}</h3>
                  <button className="btn">{this.props.gallery.btnText}</button>
                </div>
              </article>
            ): null }

          </div>

        </section>

        <Footer onClick={this.props.onClick} />

      </div>
    );
  }
}

export default inner;