import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import {
  AddContact,
  EditContact,
  ViewContact,
  Navbar,
  Contact,
  Contactt,
} from "./components/Index";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [getCounts, setCount] = useState([]);
  const [getGroups, setGroups] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await axios.get(
          "http://localhost:9000/contact"
        );
        const { data: groupData } = await axios.get(
          "http://localhost:9000/group"
        );
        console.log(contactData);
        setCount(contactData);
        setGroups(groupData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="contacts" />} />
        <Route
          path="/contacts"
          element={<Contact contacts={getCounts} loading={loading} />}
        />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
      {/* <Contact contacts={getCounts} loading={loading} /> */}
    </div>
  );
};

export default App;
