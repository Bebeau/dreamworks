import React from 'react';

class carousel extends React.Component {
  // define initial states and bind functions
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
  render() {
    return (
      <div id="gallery" className={this.props.images ? 'show': null}>
        <section id="galleryWrap">
          {this.props.images !== false ? this.props.images.map((image, index) =>
            <img key={index} src={image} className={this.props.activeImage === index ? "active" : "slide"} alt="" />
          ): null}
        </section>
        <nav>
          <article>
            <span>{(this.props.activeImage + 1)}</span> of <span>{this.props.images ? (this.props.images.length) : "1"}</span>
          </article>
          <div className="arrows">
            <article data-arrow="prev" onClick={this.props.changeSlide}></article>
            <article data-arrow="next" onClick={this.props.changeSlide}></article>
          </div>
        </nav>
      </div>
    );
  }
}

export default carousel;
