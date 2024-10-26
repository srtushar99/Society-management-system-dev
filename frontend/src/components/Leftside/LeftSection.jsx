import React from 'react';
import Group1000005870 from '../assets/Group 1000005870.png';
import Frame1000004995 from '../assets/Frame 1000004995.png';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const LeftSection = () => {
  return (

    // Left Section
    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light position-relative">
      <h1 className='nunito-sans' style={{ position: 'absolute', top: '60px', left: '60px', fontSize: "40px", color: "rgba(254, 81, 46, 1)" }}>
        Dash<span style={{ color: "#202224" }}>Stack</span>
      </h1>
      <img src={Group1000005870} alt="Login Screen Illustration" className="img-fluid" style={{ maxHeight: '30%', width: '500px', zIndex: 1 }} />
      <div className="text-center mt-4">
        <p className='h4 nunito-sans' style={{ color: "#202224" }}>
          Your Space, Your Place: <span style={{ color: "#F09619" }}> Society Management</span>
        </p>
        <p className='h4 nunito-sans'>Made Simple.</p>
        <img src={Frame1000004995} alt="Made Simple Illustration" style={{ maxWidth: '70%', height: 'auto' }} />
      </div>
    </div>
  );
}

export default LeftSection;
