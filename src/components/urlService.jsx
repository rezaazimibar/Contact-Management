import axios from "axios";

const SERVER_Url = "http://localhost:9000";

export const getAllContacts = () => {
  const url = `${SERVER_Url}/contact`;
  return axios.get(url);
};
export const getContact = (contactId) => {
  const url = `${SERVER_Url}/contact/${contactId}`;
  return axios.get(url);
};
export const getAllGroups = () => {
  const url = `${SERVER_Url}/group`;
  return axios.get(url);
};
export const getGroup = (groupId) => {
  const url = `${SERVER_Url}/group/${groupId}`;
  return axios.get(url);
};
export const createContact = (contact) => {
  const url = `${SERVER_Url}/contact`;
  return axios.post(url, contact);
};
export const updateContact = (contact, contactId) => {
  const url = `${SERVER_Url}/contact/${contactId}`;
  return axios.put(url, contact);
};
export const deleteContact = (contactId) => {
  const url = `${SERVER_Url}/contact/${contactId}`;
  return axios.delete(url);
};
