import "./App.css";
import { confirmAlert } from "react-confirm-alert";

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
  const [forceRender, setForceRender] = useState(false);
  const [getCounts, setCount] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullName: "",
    phot: "",
    phone: "",
    email: "",
    job: "",
    group: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setCount(contactData);
        setGroups(groupData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setCount(contactData);
        setGroups(groupData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [forceRender]);
  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({});
        navigate("/contacts");
        setForceRender(!forceRender);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: [event.target.value],
    });
  };
  const confirm = (contactId, contactFullName) => {
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
        setCount(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contact
              contacts={getCounts}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              loading={loading}
              setContactInfo={setContactInfo}
              contact={getContact}
              createContactForm={createContactForm}
              groups={getGroups}
            />
          }
        />
        <Route
          path="/contacts/:contactId"
          element={<ViewContact loading={loading} />}
        />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
