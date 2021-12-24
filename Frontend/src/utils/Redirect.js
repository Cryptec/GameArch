import React, { Component } from 'react';


class Redirect extends Component {


render() {
        
setTimeout(function () { window.location.replace("/login"); }, 2500);
        
        return (

                    <div className="redirectContent">
                      
                             Successfully changed password! 
                         
                             ...Redirect...
                       

                    </div>

        )
    }
}

export default Redirect