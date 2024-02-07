import React, { useState, useEffect } from 'react';
import '../styles/CreateContactPage.css';

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

    const isEmailUnique = (email) => {
        return !contactsList.some((existingContact) => existingContact.email === email);
    };



    const validateValues = (contact) => {
        let errors = {};
        if (contact.email.trim() === '') {
            errors.email = "Email cannot be empty";
        } else if (!isEmailUnique(contact.email)) {
            errors.email = "Email must be unique";
        }
        if (contact.firstName.trim() === '') {
            errors.firstName = "First Name cannot be empty";
        }
        if (contact.firstName.length < 3) {
            errors.firstName = "First Name too short";
        }
        if (contact.firstName.length > 25) {
            errors.firstName = "First Name too long";
        }

        if (contact.lastName.trim() !== '' && (contact.lastName.length < 2 || contact.lastName.length > 30)) {
            errors.lastName = "Last name has to be between 2 and 30 characters";
        }


        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(contact));
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
            <form className="contact-form">
                <label>Email:</label>
                <input
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

                <label>First Name:</label>
                <input
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

                <label>Last Name (Optional):</label>
                <input
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


                <button className="submit-btn" type="button" onClick={handleSubmit}>
                    Create Contact
                </button>
                <button className="cancel-btn" type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateContactPage;
