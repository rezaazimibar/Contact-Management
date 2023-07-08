import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";

import Spinergif from "../Spiner";
import { COMMENT, GREEN, PURPLE } from "../../helpers/color";

const AddContact = () => {
  const { loading, contact, onContactChange, createContact, groups } =
    useContext(ContactContext);
  return (
    <>
      {loading ? (
        <Spinergif />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assests/manNoting.png")}
              alt="name"
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={createContact}>
                    <div className="mb-2">
                      <input
                        name="fullName"
                        type="text"
                        value={contact.fullName}
                        onChange={onContactChange}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phot"
                        value={contact.photo}
                        onChange={onContactChange}
                        type="text"
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="phone"
                        value={contact.number}
                        onChange={onContactChange}
                        type="number"
                        className="form-control"
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        value={contact.email}
                        onChange={onContactChange}
                        name="email"
                        className="form-control"
                        required={true}
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={contact.job}
                        onChange={onContactChange}
                        name="job"
                        className="form-control"
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        value={contact.group}
                        name="group"
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option
                          value={contact.group}
                          onChange={onContactChange}
                        >
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
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ساخت مخاطب"
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
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
