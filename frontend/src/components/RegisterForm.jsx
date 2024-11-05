import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './styles.css' // Make sure to create this file for styles
import axios from 'axios';

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
        if (!formData.select_society) newErrors.select_society = 'Society is required';
        if (!formData.Password) newErrors.Password = 'Password is required';
        if (!formData.Confirm_password) newErrors.Confirm_password = 'Confirm Password is required';
        if (formData.Password !== formData.Confirm_password) newErrors.Confirm_password = 'Passwords do not match';
        if (!formData.agree) newErrors.agree = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         console.log('Form submitted:', formData);
    //         // Registration success logic (e.g., API call)
    //         alert('Registration successful!');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Make the API call
                const { agree, ...dataToSend } = formData; 
                 const response = await axios.post('http://localhost:5000/api/v1/Registration', dataToSend );
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

    const handleAddSociety = () => {
        const { name, address, Country, State, City, zipCode } = newSocietyData;
        if (name.trim() && address.trim() && Country.trim() && State.trim() && City.trim() && zipCode.trim()) {
            setFormData((prevData) => ({ ...prevData, select_society: name }));
            alert(`Society "${name}" added successfully!`);
            setShowModal(false);
            setNewSocietyData({ name: '', address: '', Country: '', State: '', City: '', zipCode: '' });
        } else {
            alert('Please fill in all society details.');
        }
    };


    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light position-relative">
                    <h1 className='nunito-sans' style={{ fontSize: "40px", color: "rgba(254, 81, 46, 1)", left: "40px", top: "40px", position: "absolute", zIndex: "999" }}>
                        Dash<span style={{ color: "#202224" }}>Stack</span>
                    </h1>

                    <Carousel interval={1500} className="w-100">
                        <Carousel.Item>
                            <img className="d-block w-100" src="/public/Group 1000005856.png" alt="First slide" style={{ maxHeight: '55vh', objectFit: 'cover', zIndex: "-9999" }} />
                            <div style={{ position: "absolute", bottom: "-10px", zIndex: "7788777", width: "100%" }}>
                                <h3 style={{ color: "black" }}>Connect, Collaborate, and Control- <span style={{ color: "rgba(254, 81, 46, 1)" }}>Society</span></h3>
                                <p style={{ color: "rgba(254, 81, 46, 1)" }}>Management<span style={{ color: "black" }}> Simplified</span></p>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="/public/Group 1000005870.png" alt="Second slide" style={{ maxHeight: '60vh', objectFit: 'cover' }} />
                            <Carousel.Caption>
                                <div style={{ position: "absolute", bottom: "-10px", zIndex: "7788777", width: "100%" }}>
                                    <h3 style={{ color: "black" }}>Your Space, Your Place: Society Management</h3>
                                    <p style={{ color: "black" }}>Made Simple</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div className="col-md-6">
                    <h2 className="mt-4">Registration</h2>
                    <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
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
                        <div className="mb-3 ">
                            <label>Select Society <span className="text-danger">*</span></label>
                            <select name="select_society" value={formData.select_society} onChange={handleChange} className="form-control">
                                <option value="">Select Society...</option>
                                <option value="67196b876b61776c49dc8a19">Shantigram Society</option>
                                <option value="society2">Shivpark Society</option>
                                <option value="society3">Harekrushna Society</option>
                                <option value="society4">Gokuldham Society</option>
                                <option value="society5">Anandhara Society</option>
                                <option value="society6">Ridhi-Shidhi Society</option>
                            </select>
                            {errors.select_society && <small className="text-danger">{errors.select_society}</small>}
                            <button type="button" onClick={() => setShowModal(true)} className="btn mt-2" style={{ backgroundColor: "rgba(240, 150, 25, 1)" }}>Create Society</button>
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                            <label>Password <span className="text-danger">*</span></label>
                            <input type={showPassword ? 'text' : 'Password'} name="Password" value={formData.Password} placeholder='Enter Password' onChange={handleChange} className="form-control" />
                            {errors.Password && <small className="text-danger">{errors.Password}</small>}
                            <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: "absolute", right: "0", top: "45%" }}>
                                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <input type={showConfirmPassword ? 'text' : 'Password'} name="Confirm_password" value={formData.Confirm_password} placeholder='Confirm Password' onChange={handleChange} className="form-control" />
                            {errors.Confirm_password && <small className="text-danger">{errors.Confirm_password}</small>}
                            <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer', position: "absolute", right: "0", top: "45%" }}>
                                <i className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className="form-check mb-3">
                            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="form-check-input"  />
                            <label className="form-check-label">I agree to the terms and conditions</label>
                            {errors.agree && <small className="text-danger">{errors.agree}</small>}
                        </div>
                        <button type="submit" className="btn w-100" style={{ backgroundColor: "rgba(240, 150, 25, 1)" }}>Register</button>
                        <p className="my-2">Already have an account? <Link to="/login" className="text-primary">Log in</Link></p>
                    </form>

                    {showModal && (
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Create New Society</h5>
                                        <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label>Society Name <span className="text-danger">*</span></label>
                                            <input type="text" value={newSocietyData.name} onChange={(e) => setNewSocietyData({ ...newSocietyData, name: e.target.value })} className="form-control" required />
                                        </div>
                                        <div className="mb-3">
                                            <label>Address <span className="text-danger">*</span></label>
                                            <input type="text" value={newSocietyData.address} onChange={(e) => setNewSocietyData({ ...newSocietyData, address: e.target.value })} className="form-control" required />
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label>Country <span className="text-danger">*</span></label>
                                                <input type="text" value={newSocietyData.Country} onChange={(e) => setNewSocietyData({ ...newSocietyData, Country: e.target.value })} className="form-control" required />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label>State <span className="text-danger">*</span></label>
                                                <input type="text" value={newSocietyData.State} onChange={(e) => setNewSocietyData({ ...newSocietyData, State: e.target.value })} className="form-control" required />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label>City <span className="text-danger">*</span></label>
                                                <input type="text" value={newSocietyData.City} onChange={(e) => setNewSocietyData({ ...newSocietyData, City: e.target.value })} className="form-control" required />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label>Zip Code <span className="text-danger">*</span></label>
                                                <input type="text" value={newSocietyData.zipCode} onChange={(e) => setNewSocietyData({ ...newSocietyData, zipCode: e.target.value })} className="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn border" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button onClick={handleAddSociety} className="btn border">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
