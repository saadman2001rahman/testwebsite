// Import necessary dependencies and components from React
import React, { useState } from 'react';
import MainPage from './MainPage';
import CreateContactPage from './CreateContactPage';
import EditContactPage from './EditContactPage';

const App = () => {
  const [page, setPage] = useState('main');
  const [contactsList, setContactsList] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const addContact = (newContact) => {
    setContactsList([...contactsList, newContact]);
    setPage('main');
  };

  const removeContact = (index) => {
    const updatedList = [...contactsList];
    updatedList.splice(index, 1);
    setContactsList(updatedList);
  };

  const editContact = (index) => {
    setSelectedContactIndex(index);
    setPage('edit');
  };

  const updateContact = (editedContact) => {
    const updatedList = [...contactsList];
    updatedList[selectedContactIndex] = editedContact;
    setContactsList(updatedList);
    setPage('main');
    setSelectedContactIndex(null);
  };

  return (
    <div>
      {page === 'main' && (
        <MainPage
          contactsList={contactsList}
          onCreateClick={() => setPage('create')}
          onRemoveClick={removeContact}
          onEditClick={editContact}
        />
      )}
      {page === 'create' && (
        <CreateContactPage onAddContact={addContact} onCancelClick={() => setPage('main')} />
      )}
      {page === 'edit' && (
        <EditContactPage
          contact={contactsList[selectedContactIndex]}
          onUpdateContact={updateContact}
          onCancelClick={() => setPage('main')}
        />
      )}
    </div>
  );
};

export default App;
