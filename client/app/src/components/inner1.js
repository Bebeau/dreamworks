import React from 'react';

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
      errorInfo: errorInfo
    })
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
    	<div>

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
                  <div>
                    <a href={data.link} target="_blank">
                      <img src={data.platform} alt="" />
                    </a>
                  </div>
                );
              })
            ): null }
          </div>

          <div className="innerItems">
            <h2>Take A Peek</h2>
            {this.props.items ? (
              this.props.items.map((data, key) => {
                return (
                    <button data-video={data.video}>
                      <img src="" alt="" />
                      <h3>{data.title}</h3>
                      <p>{data.description}</p>
                    </button>
                );
              })
            ): null }
          </div>

          <div className="innerSecondary">
            {this.props.consideration ? ( 
              <div className="innerConsideration">
                <img src="" alt="" />
                <h5>For Special Consideration</h5>
                <h3>{this.props.consideration.title}</h3>
                <p>{this.props.consideration.description}</p>
                <button data-video={this.props.consideration.video}>
                  {this.props.consideration.btnText}
                </button>
              </div>
            ): null }
          </div>

        </section>

      </div>
    );
  }
}

export default inner;