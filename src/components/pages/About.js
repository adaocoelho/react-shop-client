import React from "react";
import Image from 'react-bootstrap/Image'
import picture from './about.png'
import './About.css'



function About() {
  return (
    <div style= {{textAlign: 'center '}}>
        
        <Image src={picture} fluid />
        </div>
  );
}




export default About;
