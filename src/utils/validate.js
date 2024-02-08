export function validateValues(contact, contactsList) {
  let errors = {};
  if (contact.email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else if (!isEmailUnique(contact.email, contactsList)) {
    errors.email = "Email must be unique";
  }
  if (contact.firstName.trim() === "") {
    errors.firstName = "First Name cannot be empty";
  }
  if (contact.firstName.length < 3) {
    errors.firstName = "First Name too short";
  }
  if (contact.firstName.length > 25) {
    errors.firstName = "First Name too long";
  }

  if (
    contact.lastName.trim() !== "" &&
    (contact.lastName.length < 2 || contact.lastName.length > 30)
  ) {
    errors.lastName = "Last name has to be between 2 and 30 characters";
  }

  return errors;
}

const isEmailUnique = (email, contactsList) => {
  return !contactsList.some(
    (existingContact) => existingContact.email === email
  );
};
