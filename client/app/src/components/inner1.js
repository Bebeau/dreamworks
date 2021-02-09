import React from 'react';

class inner extends React.Component{
    render(){
       return (
       		<div>
       			{this.props.description}
            <img src={this.props.hero} alt="" />
            {this.props.bonus}
            {this.props.consideration}
          </div>
       );
    }
}

export default inner;