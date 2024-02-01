import React, { useState, useEffect } from 'react';

const CreateContactPage = ({ onAddContact, onCancelClick }) => {
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


    const validateValues = (contact) => {
        let errors = {};
        if (contact.email.trim() === '') {
            errors.email = "Email cannot be empty";
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
        <div>
            {Object.keys(errors).length === 0 && submitting ? (
                <span className="success">Successfully submitted ✓</span>
            ) : null}
            <h2>Create Contact</h2>
            <form>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleInputChange}
                    style={{ border: errors.email ? "1px solid red" : null }}
                />
                {errors.email ? (
                    <p className="error">{errors.email}</p>
                ) : null}

                <label>First Name:</label>
                <input
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
                    type="text"
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.lastName ? 'red' : '' }}
                />
                {errors.lastName ? (
                    <p className="error">{errors.lastName}</p>
                ) : null}

                <button type="button" onClick={handleSubmit}>
                    Create Contact
                </button>
                <button type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateContactPage;
