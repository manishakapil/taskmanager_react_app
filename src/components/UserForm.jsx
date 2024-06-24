import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserForm.css';
import Header from './Header';

const UserForm = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'medium');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        profilePhoto: null,
        documentPDF: null, 
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('userFormBody');
        return () => {
            document.body.classList.remove('userFormBody');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/add-task', { state: { userName: `${formData.firstName} ${formData.lastName}` } });
    };

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    return (
        <div className={"App " + theme}>
            <div className='container'>
                <Header setTheme={setTheme} theme={theme}>
                    TASK MANAGER
                </Header>
            </div>
            <form onSubmit={handleSubmit} className="userFormContainer">
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profilePhoto">Profile Photo:</label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="documentPDF">Document PDF:</label>
                    <input
                        type="file"
                        id="documentPDF"
                        name="documentPDF"
                        accept=".pdf"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserForm;
