import React from 'react';

class Footer extends React.Component{
    render(){
       return (
       		<footer>
       			<button onClick={this.props.onClick} className={this.props.disabled === false ? 'disabled' : null}>All Animated Series</button>
       			<a href="https://www.dreamworks.com/terms-of-use" target="_blank" rel="noreferrer">Terms of Use</a>
       			<span>&copy; DreamWorks Animation LLC. All Rights Reserved.</span>
          	</footer>
       );
    }
}

export default Footer;