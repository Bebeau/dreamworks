import React from 'react';

class Footer extends React.Component{
    render(){
       return (
       		<footer>
       			<button onClick={this.props.onClick}>All Animated Series</button>
       			<button>Terms of Use</button>
       			<span>&copy; DreamWorks Animation LLC. All Rights Reserved.</span>
          	</footer>
       );
    }
}

export default Footer;