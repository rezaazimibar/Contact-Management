import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../urlService";

import Spinergif from "../Spiner";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/color";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const {
    contacts,
    setContacts,
    setFilteredContacts,
    loading,
    groups,
    setLoading,
  } = useContext(ContactContext);
  const [contact, setContact] = useState({
    contact: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err.massage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { status, data } = await updateContact(contact, contactId);
      if (status === 200) {
        setLoading(false);

        const allContacts = [...contacts];
        const contactIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[contactIndex] = {...data};
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.massage);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinergif />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="fullName"
                        type="text"
                        className="form-control"
                        value={contact.fullName}
                        onChange={onContactChange}
                        required={true}
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phot"
                        type="text"
                        value={contact.phot}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phone"
                        type="number"
                        className="form-control"
                        value={contact.phone}
                        onChange={onContactChange}
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={contact.email}
                        onChange={onContactChange}
                        required={true}
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        value={contact.job}
                        onChange={onContactChange}
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        style={{ color: PURPLE }}
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option style={{ backgroundColor: PURPLE }} value="">
                          انتخاب گروه
                        </option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option
                              style={{ backgroundColor: PURPLE }}
                              key={group.id}
                              value={group.id}
                            >
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    alt={contact.fullName}
                    src={contact.phot}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                alt="not found"
                src={require("../../assests/manNoting.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
      <form action="" onSubmit={submitForm}></form>
    </>
  );
};
export default EditContact;
