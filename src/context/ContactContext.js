import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  contacts: [],
  contact:{},
  contactQuery: {},
  filteredContacts:[],
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  setFilteredContacts: () => {},
  contactSearch: () => {},
});
