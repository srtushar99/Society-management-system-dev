import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './styles.css' // Make sure to create this file for styles

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        state: '',
        city: '',
        society: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newSocietyData, setNewSocietyData] = useState({
        name: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error on change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.society) newErrors.society = 'Society is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.agree) newErrors.agree = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Registration success logic (e.g., API call)
            alert('Registration successful!');
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const handleAddSociety = () => {
        const { name, address, country, state, city, zipCode } = newSocietyData;
        if (name.trim() && address.trim() && country.trim() && state.trim() && city.trim() && zipCode.trim()) {
            setFormData((prevData) => ({ ...prevData, society: name }));
            alert(`Society "${name}" added successfully!`);
            setShowModal(false);
            setNewSocietyData({ name: '', address: '', country: '', state: '', city: '', zipCode: '' });
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
                                <input type="text" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} className="form-control" />
                                {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                            </div>
                            <div className="col-md-6">
                                <label>Last Name <span className="text-danger">*</span></label>
                                <input type="text" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} className="form-control" />
                                {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Email <span className="text-danger">*</span></label>
                                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="form-control" />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="col-md-6">
                                <label>Phone Number <span className="text-danger">*</span></label>
                                <input type="tel" name="phoneNumber" placeholder="91+" value={formData.phoneNumber} onChange={handleChange} className="form-control" />
                                {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label>Country <span className="text-danger">*</span></label>
                                <input type="text" name="country" placeholder="Enter Country" value={formData.country} onChange={handleChange} className="form-control" />
                                {errors.country && <small className="text-danger">{errors.country}</small>}
                            </div>
                            <div className="col-md-4">
                                <label>State <span className="text-danger">*</span></label>
                                <input type="text" name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} className="form-control" />
                                {errors.state && <small className="text-danger">{errors.state}</small>}
                            </div>
                            <div className="col-md-4">
                                <label>City <span className="text-danger">*</span></label>
                                <input type="text" name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} className="form-control" />
                                {errors.city && <small className="text-danger">{errors.city}</small>}
                            </div>
                        </div>
                        <div className="mb-3 ">
                            <label>Select Society <span className="text-danger">*</span></label>
                            <select name="society" value={formData.society} onChange={handleChange} className="form-control" required>
                                <option value="">Select Society...</option>
                                <option value="society1">Shantigram Society</option>
                                <option value="society2">Shivpark Society</option>
                                <option value="society3">Harekrushna Society</option>
                                <option value="society4">Gokuldham Society</option>
                                <option value="society5">Anandhara Society</option>
                                <option value="society6">Ridhi-Shidhi Society</option>
                            </select>
                            {errors.society && <small className="text-danger">{errors.society}</small>}
                            <button type="button" onClick={() => setShowModal(true)} className="btn mt-2" style={{ backgroundColor: "rgba(240, 150, 25, 1)" }}>Create Society</button>
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                            <label>Password <span className="text-danger">*</span></label>
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} placeholder='Enter Password' onChange={handleChange} className="form-control" />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                            <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: "absolute", right: "0", top: "45%" }}>
                                <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm Password' onChange={handleChange} className="form-control" />
                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                            <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer', position: "absolute", right: "0", top: "45%" }}>
                                <i className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </span>
                        </div>
                        <div className="form-check mb-3">
                            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="form-check-input" required />
                            <label className="form-check-label">I agree to the terms and conditions</label>
                            {errors.agree && <small className="text-danger">{errors.agree}</small>}
                        </div>
                        <button type="submit" className="btn w-100" style={{ backgroundColor: "rgba(240, 150, 25, 1)" }}>Register</button>
                        <p className="my-2">Already have an account? <Link to="/" className="text-primary">Log in</Link></p>
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
                                                <input type="text" value={newSocietyData.country} onChange={(e) => setNewSocietyData({ ...newSocietyData, country: e.target.value })} className="form-control" required />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label>State <span className="text-danger">*</span></label>
                                                <input type="text" value={newSocietyData.state} onChange={(e) => setNewSocietyData({ ...newSocietyData, state: e.target.value })} className="form-control" required />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label>City <span className="text-danger">*</span></label>
                                                <input type="text" value={newSocietyData.city} onChange={(e) => setNewSocietyData({ ...newSocietyData, city: e.target.value })} className="form-control" required />
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
