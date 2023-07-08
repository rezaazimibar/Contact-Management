import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

import { PURPLE } from "../../helpers/color";
const SearchContact = () => {
  const { contactSearch } = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        style={{ backgroundColor: PURPLE }}
        id="basic-addon1"
      >
        <i className="fas fa-search"></i>
      </span>
      <input
        dir="rtl"
        type="text"
        onChange={event=> contactSearch(event.target.value)}
        className=" form-control "
        placeholder="جست و جوی مخاطب"
      />
    </div>
  );
};
export default SearchContact;
