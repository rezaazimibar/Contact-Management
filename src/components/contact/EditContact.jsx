import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getContact, getAllGroups, updateContact } from "../urlService";

import Spinergif from "../Spiner";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/color";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      phot: "",
      mobile: "",
      email: "",
      group: "",
    },
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getAllGroups();
        console.log(groupData);
        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupData,
        });
      } catch (err) {
        console.log(err.massage);
        setState({ ...state, loading: false });
      }
    };
    fetchData();
  }, []);
  const setContactUpdate = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: [event.target.value],
      },
    });
  };
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, loading: true });
      const { data } = await updateContact(state.contact, contactId);
      setState({ ...state, loading: false });
      if (data) {
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.massage);
      setState({ ...state, loading: false });
    }
  };
  const { groups, contact, loading } = state;
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
                        onChange={setContactUpdate}
                        required={true}
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phot"
                        type="text"
                        value={contact.phot}
                        onChange={setContactUpdate}
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        className="form-control"
                        value={contact.mobile}
                        onChange={setContactUpdate}
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
                        onChange={setContactUpdate}
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
                        onChange={setContactUpdate}
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                      style={{ color: PURPLE }}
                        name="group"
                        value={contact.group}
                        onChange={setContactUpdate}
                        required={true}
                        className="form-control"
                      >
                        <option style={{ backgroundColor: PURPLE }} value="">
                          انتخاب گروه
                        </option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option style={{ backgroundColor: PURPLE }} key={group.id} value={group.id}>
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
                    src={contact.phot}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
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
