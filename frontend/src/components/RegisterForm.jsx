import * as React from "react";
import { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import axiosInstance from './Common/axiosInstance';
import './styles.css' // Make sure to create this file for styles
import { Button, Dropdown } from 'react-bootstrap';
import './RegisterForm.css'
import Lefts from "./Left/LeftSe";


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        First_Name: '',
        Last_Name: '',
        Email_Address: '',
        Phone_Number: '',
        Country: '',
        State: '',
        City: '',
        select_society: '',
        Password: '',
        Confirm_password: '',
        // agree: false,
    });

    const [selectedSociety, setSelectedSociety] = useState(null);
    const [societies, setSocieties] = useState([]);

    

    const handleSelect = (society) => {
        const societyID = society._id;
        const societyName = society.Society_name;
        setSelectedSociety({id: societyID, name: societyName});
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newSocietyData, setNewSocietyData] = useState({
        name: '',
        address: '',
        Country: '',
        State: '',
        City: '',
        zipCode: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error on change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.First_Name) newErrors.First_Name = 'First Name is required';
        if (!formData.Last_Name) newErrors.Last_Name = 'Last Name is required';
        if (!formData.Email_Address) newErrors.Email_Address = 'Email is required';
        if (!formData.Phone_Number) newErrors.Phone_Number = 'Phone Number is required';
        if (!formData.Country) newErrors.Country = 'Country is required';
        if (!formData.State) newErrors.State = 'State is required';
        if (!formData.City) newErrors.City = 'City is required';
       // if (!formData.select_society) newErrors.select_society = 'Society is required';
      //  if (!formData.select_society) newErrors.select_society = 'Society is required';
      if (!selectedSociety) newErrors.selectedSociety = 'Society is required';
        if (!formData.Password) newErrors.Password = 'Password is required';
        if (!formData.Confirm_password) newErrors.Confirm_password = 'Confirm Password is required';
        if (formData.Password !== formData.Confirm_password) newErrors.Confirm_password = 'Passwords do not match';
        if (!formData.agree) newErrors.agree = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Merge the objects
                const mergedData = {
                    ...formData,                   
                    select_society: selectedSociety.id   
                };

                // Make the API call
                const { agree, ...dataToSend } = mergedData; 
                console.log(selectedSociety);
                const response = await axiosInstance.post('/v1/Registration', dataToSend );
                console.log('Form submitted:', response.data);
                alert('Registration successful!');
            } catch (error) {
                console.error('There was an error!', error);
                alert('Registration failed. Please try again later.');
            }
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const [modalErrors, setModalErrors] = useState({}); // For modal errors

    const validateModalForm = () => {
        const newModalErrors = {};
        if (!newSocietyData.name) newModalErrors.name = 'Society Name is required';
        if (!newSocietyData.address) newModalErrors.address = 'Address is required';
        if (!newSocietyData.Country) newModalErrors.Country = 'Country is required';
        if (!newSocietyData.State) newModalErrors.State = 'State is required';
        if (!newSocietyData.City) newModalErrors.City = 'City is required';
        if (!newSocietyData.zipCode) newModalErrors.zipCode = 'Zip Code is required';

        setModalErrors(newModalErrors);
        return Object.keys(newModalErrors).length === 0;
    };

    const handleAddSociety = () => {
        if (validateModalForm()) {
            setFormData((prevData) => ({ ...prevData, select_society: newSocietyData.name }));
            alert(`Society "${newSocietyData.name}" added successfully!`);
            setShowModal(false);
            setNewSocietyData({ name: '', address: '', Country: '', State: '', City: '', zipCode: '' });
            setModalErrors({});
        }
    };

     // Fetch societies from the API
    const fetchSocieties = async () => {
        try {
            const response = await axiosInstance.get('/societies/');
            console.log('Societies:', response.data);
            setSocieties(response.data.data); 
        } catch (error) {
            console.error('Error fetching societies:', error);
            alert('Failed to load societies');
        }
    };
    
   
    useEffect(() => {
        fetchSocieties();
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [showModal]);
    
    
    return (
        <div className="container-fluid  my-5">
            <div className="row ms-5 ">
                
                <Lefts/>
                <div className="col-md-6">
               
                    <h2 className="mt-4 py-3" style={{margin:"0 90px"}}>Registration</h2>
                    <form onSubmit={handleSubmit} className="p-4 py-5 border rounded shadow " style={{width:"630px",margin:"0 90px"}}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>First Name <span className="text-danger">*</span></label>
                                <input type="text" name="First_Name" placeholder="Enter First Name" value={formData.First_Name} onChange={handleChange} className="form-control" />
                                {errors.First_Name && <small className="text-danger">{errors.First_Name}</small>}
                            </div>
                            <div className="col-md-6">
                                <label>Last Name <span className="text-danger">*</span></label>
                                <input type="text" name="Last_Name" placeholder="Enter Last Name" value={formData.Last_Name} onChange={handleChange} className="form-control" />
                                {errors.Last_Name && <small className="text-danger">{errors.Last_Name}</small>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Email <span className="text-danger">*</span></label>
                                <input type="email" name="Email_Address" placeholder="Enter Email" value={formData.Email_Address} onChange={handleChange} className="form-control" />
                                {errors.Email_Address && <small className="text-danger">{errors.Email_Address}</small>}
                            </div>
                            <div className="col-md-6">
                                <label>Phone Number <span className="text-danger">*</span></label>
                                <input type="tel" name="Phone_Number" placeholder="91+" value={formData.Phone_Number} onChange={handleChange} className="form-control" />
                                {errors.Phone_Number && <small className="text-danger">{errors.Phone_Number}</small>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label>Country <span className="text-danger">*</span></label>
                                <input type="text" name="Country" placeholder="Enter Country" value={formData.Country} onChange={handleChange} className="form-control" />
                                {errors.Country && <small className="text-danger">{errors.Country}</small>}
                            </div>
                            <div className="col-md-4">
                                <label>State <span className="text-danger">*</span></label>
                                <input type="text" name="State" placeholder="Enter State" value={formData.State} onChange={handleChange} className="form-control" />
                                {errors.State && <small className="text-danger">{errors.State}</small>}
                            </div>
                            <div className="col-md-4">
                                <label>City <span className="text-danger">*</span></label>
                                <input type="text" name="City" placeholder="Enter City" value={formData.City} onChange={handleChange} className="form-control" />
                                {errors.City && <small className="text-danger">{errors.City}</small>}
                            </div>
                        </div>
                        

                        <div className="mb-3 mx-3" >
                        <label>Select Society <span className="text-danger">*</span></label>
                        <Dropdown >
                            <Dropdown.Toggle variant="white" className="w-100  border" >
                                {selectedSociety ? selectedSociety.name : 'Select Society'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100">
                                {societies.map((society) => (
                                    <Dropdown.Item
                                        key={society._id}
                                        eventKey={society._id}
                                        onClick={() => handleSelect(society)}
                                    >
                                        {society.Society_name}
                                    </Dropdown.Item>
                                ))}
                                <div className="d-flex justify-content-center p-2">
                                <Button onClick={() => setShowModal(true)} className="btn mt-2 bt w-100" >
                                        Create Society
                                    </Button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        {errors.selectedSociety && <small className="text-danger">{errors.selectedSociety}</small>}
                        </div>

        
                        <div className="mb-3 mx-3" style={{ position: "relative" }}>
                            <label>Password <span className="text-danger">*</span></label>
                            <input type={showPassword ? 'text' : 'Password'} name="Password" value={formData.Password} placeholder='Enter Password' onChange={handleChange} className="form-control" />
                            {errors.Password && <small className="text-danger">{errors.Password}</small>}
                            <span className="input-group-text py-2" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: "absolute", right: "0", top: "39%" }}>
                                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className="mb-3 mx-3" style={{ position: "relative" }}>
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <input type={showConfirmPassword ? 'text' : 'Password'} name="Confirm_password" value={formData.Confirm_password} placeholder='Confirm Password' onChange={handleChange} className="form-control" />
                            {errors.Confirm_password && <small className="text-danger">{errors.Confirm_password}</small>}
                            <span className="input-group-text py-2" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer', position: "absolute", right: "0", top: "39%" }}>
                                <i className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className="form-check mb-3 mx-3">
                            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="form-check-input"  />
                            <label className="form-check-label">I agree to the terms and conditions</label>
                            {errors.agree && <small className="text-danger">{errors.agree}</small>}
                        </div>
                        <button type="submit" className="btn mx-3 bt" style={{width:"96%"}}>Register</button>
                        <p className="my-2 mx-3">Already have an account? <Link to="/" className="text-primary">Log in</Link></p>
                    </form>

                    {showModal && (
                       <div className="container-fluid my-5">
                       {/* Form components remain unchanged */}
                       {showModal && (
                           <div className="modal show modal-overlay " style={{ display: 'block', zIndex: 9999, }}>
                               <div className="modal-dialog">
                                   <div className="modal-content">
                                       <div className="modal-header">
                                           <h5 className="modal-title">Create New Society</h5>
                                       </div>
                                       <div className="modal-body">
                                           <div className="mb-3 p-0">
                                               <label>Society Name <span className="text-danger">*</span></label>
                                               <input type="text" value={newSocietyData.name} onChange={(e) => setNewSocietyData({ ...newSocietyData, name: e.target.value })} className="form-control" />
                                               {modalErrors.name && <small className="text-danger">{modalErrors.name}</small>}
                                           </div>
                                           <div className="mb-3 p-0">
                                               <label>Address <span className="text-danger">*</span></label>
                                               <input type="text" value={newSocietyData.address} onChange={(e) => setNewSocietyData({ ...newSocietyData, address: e.target.value })} className="form-control" />
                                               {modalErrors.address && <small className="text-danger">{modalErrors.address}</small>}
                                           </div>
                                           <div className="row">
                                               <div className="col-6 mb-3 p-0 pe-2" >
                                                   <label>Country <span className="text-danger">*</span></label>
                                                   <input type="text"  value={newSocietyData.Country} onChange={(e) => setNewSocietyData({ ...newSocietyData, Country: e.target.value })} className="form-control" />
                                                   {modalErrors.Country && <small className="text-danger">{modalErrors.Country}</small>}
                                               </div>
                                               <div className="col-6 mb-3 p-0">
                                                   <label>State <span className="text-danger">*</span></label>
                                                   <input type="text" value={newSocietyData.State} onChange={(e) => setNewSocietyData({ ...newSocietyData, State: e.target.value })} className="form-control" />
                                                   {modalErrors.State && <small className="text-danger">{modalErrors.State}</small>}
                                               </div>
                                               <div className="col-6 mb-3 p-0 pe-2">
                                                   <label>City <span className="text-danger">*</span></label>
                                                   <input type="text" value={newSocietyData.City} onChange={(e) => setNewSocietyData({ ...newSocietyData, City: e.target.value })} className="form-control" />
                                                   {modalErrors.City && <small className="text-danger">{modalErrors.City}</small>}
                                               </div>
                                               <div className="col-6 mb-3 p-0">
                                                   <label>Zip Code <span className="text-danger">*</span></label>
                                                   <input type="text" value={newSocietyData.zipCode} onChange={(e) => setNewSocietyData({ ...newSocietyData, zipCode: e.target.value })} className="form-control" />
                                                   {modalErrors.zipCode && <small className="text-danger">{modalErrors.zipCode}</small>}
                                               </div>
                                           </div>
                                       </div>
                                       <div className="modal-footer mx-auto">
                                           <button type="button" className="btn btn-white border px-3"  onClick={() => setShowModal(false)}>Cancel</button>
                                           <button onClick={handleAddSociety} className="btn bt px-3">Save</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
