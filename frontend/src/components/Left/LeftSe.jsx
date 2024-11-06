import React from 'react';
import { Carousel } from 'react-bootstrap';

// import Frame1000004995 from '../assets/Frame 1000004995.png';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const Lefts= () => {
  return (

    // Left Section
    <div className="col-md-6 ms-5 d-flex flex-column justify-content-center  align-items-center bg-light position-relative" style={{width:"860px",backgroundColor:"white"}} >
    <h1 className='nunito-sans' style={{ fontSize: "40px", color: "rgba(254, 81, 46, 1)", left: "40px", top: "40px", position: "absolute", zIndex: "999" }}>
        Dash<span style={{ color: "#202224" }}>Stack</span>
    </h1>

    <Carousel interval={1500} className="w-100 " >
        <Carousel.Item >
            <img className="d-block  " src="/public/Group 1000005856.png" style={{ maxHeight: '50vh', objectFit: 'cover', zIndex: "-9999",width:"80%" }} />
            <div style={{ position: "absolute", bottom: "-10px", zIndex: "7788777", width: "100%" }}>
                <h3 style={{ color: "black" }}>Connect, Collaborate, and Control- <span style={{ color: "rgba(254, 81, 46, 1)" }}>Society</span></h3>
                <p style={{ color: "rgba(254, 81, 46, 1)" }}>Management<span style={{ color: "black" }}> Simplified</span></p>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block " src="/public/Group 1000005870.png" alt="Second slide" style={{ maxHeight: '60vh', objectFit: 'cover',width:"80%" }} />
            <Carousel.Caption>
                <div style={{ position: "absolute", bottom: "-10px", zIndex: "888", width: "100%" }}>
                    <h3 style={{ color: "black",zIndex:"-99999" }}>Your Space, Your Place: Society Management</h3>
                    <p style={{ color: "black" }}>Made Simple</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
</div>
  );
}

export default Lefts;
