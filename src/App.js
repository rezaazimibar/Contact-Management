import "./App.css";
import { confirmAlert } from "react-confirm-alert";
import { ContactContext } from "./context/ContactContext.js";
import { useImmer } from "use-immer";
import {  useEffect } from "react";
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
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [contact, setContact] = useImmer({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setContacts(contactData);
        setFilteredContacts(contactData);
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
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact);
      if (status === 201) {
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });

        setContact({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoading) => !prevLoading);
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
  const allContacts = [...contacts];
  const removeContact = async (contactId) => {
    try {
      setContacts((draft) => {
        draft.filter((c) => c.id !== contactId);
      });
      setFilteredContacts((draft) => {
        draft.filter((c) => c.id !== contactId);
      });
      const { status } = await deleteContact(contactId);
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };
  let filterTimeout;
  const contactSearch = (query) => {
    clearTimeout(filterTimeout);

    if (!query) return setFilteredContacts([...contacts]);

    filterTimeout = setTimeout(() => {
      setFilteredContacts(
        contacts.filter((contacts) => {
          return contacts.fullName.toLowerCase().includes(query.toLowerCase());
        })
      );
      setFilteredContacts((draft) =>
        draft.filter(c=>c.fullName.toLowerCase().includes(query.toLowerCase()))
      );
    }, 1000);

    setFilteredContacts(allContacts);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContacts,
        contacts,
        groups,
        filteredContacts,
        onContactChange,
        setFilteredContacts,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      {" "}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="contacts" />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
