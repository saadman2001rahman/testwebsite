import React, { useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import CreateContactPage from "./components/CreateContactPage";
import EditContactPage from "./components/EditContactPage";

const App = () => {
  // Initialize contactsList state with localStorage or an empty array
  const [contactsList, setContactsList] = useState(() => {
    const storedContacts = localStorage.getItem("contactsList");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });

  const [page, setPage] = useState("main");
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const addContact = (newContact) => {
    setContactsList([...contactsList, newContact]);
    setPage("main");
  };

  const removeContact = (index) => {
    const updatedList = [...contactsList];
    updatedList.splice(index, 1);
    setContactsList(updatedList);
  };

  const editContact = (index) => {
    setSelectedContactIndex(index);
    setPage("edit");
  };

  const updateContact = (editedContact) => {
    const updatedList = [...contactsList];
    updatedList[selectedContactIndex] = editedContact;
    setContactsList(updatedList);
    setPage("main");
    setSelectedContactIndex(null);
  };

  // Update localStorage whenever contactsList changes
  useEffect(() => {
    localStorage.setItem("contactsList", JSON.stringify(contactsList));
  }, [contactsList]);

  return (
    <div className="app-page">
      {page === "main" && (
        <MainPage
          contactsList={contactsList}
          onCreateClick={() => setPage("create")}
          onRemoveClick={removeContact}
          onEditClick={editContact}
        />
      )}
      {page === "create" && (
        <CreateContactPage
          contactsList={contactsList}
          onAddContact={addContact}
          onCancelClick={() => setPage("main")}
        />
      )}
      {page === "edit" && (
        <EditContactPage
          contact={contactsList[selectedContactIndex]}
          onUpdateContact={updateContact}
          onCancelClick={() => setPage("main")}
        />
      )}
    </div>
  );
};

export default App;
