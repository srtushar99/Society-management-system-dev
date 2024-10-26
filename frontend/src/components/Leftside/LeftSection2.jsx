import React from 'react';
import ForgotPasswordImage from '../assets/20602818_6325245 1.png'; 

const LeftSection2 = () => {
  return (
    // Left Section
    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light position-relative" style={{ padding: '20px' }}>
      <h1 className='nunito-sans' style={{ position: 'absolute', top: '60px', left: '60px', fontSize: "40px", color: "rgba(254, 81, 46, 1)" }}>
        Dash<span style={{ color: "#202224" }}>Stack</span>
      </h1>
      <img 
        src={ForgotPasswordImage} 
        alt="Forgot Password Illustration" 
        className="img-fluid" 
        style={{ 
          maxWidth: '350px', 
          height: 'auto',   
          position: 'relative', 
          marginTop: '50px',
          objectFit: 'contain' 
        }} 
      />
    </div>
  );
}

export default LeftSection2;
