import "./App.css";
import { confirmAlert } from "react-confirm-alert";
import { ContactContext } from "./context/ContactContext.js";

import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./components/urlService";



import {
  AddContact,
  EditContact,
  ViewContact,
  Navbar,
  Contact,
} from "./components/Index";
import {
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
} from "./helpers/color";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredContacts, setFilteredContact] = useState([]);
  const [contactQuery, setContactQuery] = useState({ text: "" });
  const [contact, setContact] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setContacts(contactData);
        setFilteredContact(contactData);
        setGroups(groupData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(contact);
      if (status === 201) {
        setContact({});
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const confirmDelete = (contactId, contactFullName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب{contactFullName}پاک کنی
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContact(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((contacts) => {
      return contacts.fullName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredContact(allContacts);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContact,
        contactQuery,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,

      }}
    >
      {" "}
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="contacts" />} />
          <Route
            path="/contacts"
            element={
              <Contact
                contacts={filteredContacts}
                loading={loading}
                confirmDelete={confirmDelete}
              />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <AddContact
                loading={loading}
                setContactInfo={onContactChange}
                contact={contact}
                createContactForm={createContactForm}
                groups={groups}
              />
            }
          />
          <Route
            path="/contacts/:contactId"
            element={<ViewContact loading={loading} />}
          />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
