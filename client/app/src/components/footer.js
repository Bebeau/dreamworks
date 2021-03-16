import React from 'react';

class Footer extends React.Component{
    render(){
       return (
       		<footer>
       			<button onClick={this.props.onClick} className={this.props.disabled === false ? 'disabled' : null}>All Animated Series</button>
       			<button>Terms of Use</button>
       			<span>&copy; DreamWorks Animation LLC. All Rights Reserved.</span>
          	</footer>
       );
    }
}

export default Footer;