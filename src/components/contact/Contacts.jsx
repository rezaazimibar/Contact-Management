import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/color";
import { Link } from "react-router-dom";
import Spinergif from "../Spiner";
import Contactt from "./Contact";

const Contact = () => {
  const { loading, filteredContacts, deleteContact } = useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link
                  to={"/contacts/add"}
                  className="btn mx-2"
                  style={{ backgroundColor: PINK }}
                >
                  ایجاد مخاطب جدید <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinergif />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contactt
                  key={c.id}
                  contactDelete={() => deleteContact(c.id, c.fullName)}
                  contact={c}
                />
              )) 
            ) : (
              <div
                className="text-center  py-5"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد...
                </p>
                <img
                  src={require("../../assests/noresult.gif")}
                  className="w-25"
                  alt="یافت نشد"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Contact;
