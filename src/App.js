import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import {
  createContact,
  getAllContacts,
  getAllGroups,
} from "./components/urlService";
import {
  AddContact,
  EditContact,
  ViewContact,
  Navbar,
  Contact,
} from "./components/Index";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [getCounts, setCount] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullName: "",
    photo: "",
    mobile: "",
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
  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({});
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="contacts" />} />
        <Route
          path="/contacts"
          element={<Contact contacts={getCounts} loading={loading} />}
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
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
      {/* <Contact contacts={getCounts} loading={loading} /> */}
    </div>
  );
};

export default App;
