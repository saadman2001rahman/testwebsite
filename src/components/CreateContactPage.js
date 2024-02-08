import React, { useState, useEffect } from 'react';
import '../styles/CreateContactPage.css';
import { validateValues } from "../utils/validate.js";

const CreateContactPage = ({ contactsList, onAddContact, onCancelClick }) => {
    const [contact, setContact] = useState({
        email: '',
        firstName: '',
        lastName: '',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(contact, contactsList));
        setSubmitting(true);
    };

    const finishSubmit = () => {
        console.log(contact);
        onAddContact(contact);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);

    return (
        <div className="create-contact-page">
            {Object.keys(errors).length === 0 && submitting ? (
                <span className="success">Successfully submitted ✓</span>
            ) : null}
            <h2>Create Contact</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    className="form-input"
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.email ? 'red' : '' }}
                />
                {errors.email ? (
                    <p className="error">{errors.email}</p>
                ) : null}

                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    className="form-input"
                    type="text"
                    name="firstName"
                    value={contact.firstName}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.firstName ? 'red' : '' }}
                />
                {errors.firstName ? (
                    <p className="error">{errors.firstName}</p>
                ) : null}

                <label htmlFor="lastName">Last Name (Optional):</label>
                <input
                    id="lastName"
                    className="form-input"
                    type="text"
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleInputChange}
                    minLength={2}
                    maxLength={30}
                />
                {errors.lastName ? (
                    <p className="error">{errors.lastName}</p>
                ) : null}

                <button className="submit-btn" type="submit">
                    Create
                </button>
                <button className="cancel-btn" type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateContactPage;
