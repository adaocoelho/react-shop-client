import React from 'react';
import pic from './landing.png'
import Image from 'react-bootstrap/Image'

function Landing() {
    return (
        
        <div style= {{textAlign: 'center '}}>
        
        <Image src={pic} fluid />
        </div>
    )
}


export default Landing;